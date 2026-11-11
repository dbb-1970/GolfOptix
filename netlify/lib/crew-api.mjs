import {canCourse} from './access.mjs';
import catalog from '../../public/course-catalog.json' with {type:'json'};
import {Crew,crewStore,readCrew} from './crew-store.mjs';
const courses=new Set(catalog.courses.filter(c=>!c.publicDemo).flatMap(c=>c.tracks.filter(t=>t.available).map(t=>t.id)));
const respond=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store'}});
export function crewAccess(user,state){if(canCourse(user,state.course))return{manager:true,workerId:null};const w=Object.values(state.workers).find(w=>w.identityId===user?.id&&!w.archived);return w?{manager:Crew.managerTitle(w.jobTitle),technician:w.equipmentAccess===true,workerId:w.id}:null;}
export function createCrewHandler({getUser,verifyOrigin,getStore,emailReady=()=>false,now=()=>new Date().toISOString()}){return async req=>{
 try{
  const user=await getUser();if(!user)return respond({error:'Sign in to open Crew.'},401);const course=new URL(req.url).searchParams.get('course');if(!courses.has(course))return respond({error:'This track is unavailable.'},403);
  const store=crewStore(getStore),{entry,state}=await readCrew(store,course),access=crewAccess(user,state);if(!access)return respond({error:'Crew access is not approved for this track.'},403);
  if(user.appMetadata?.crew_temp_required){const expired=Date.parse(user.appMetadata.crew_temp_expires_at||'')<Date.parse(now());return respond({error:expired?'Your temporary password expired. Ask your superintendent to reissue your welcome email.':'Choose your own password before opening Crew.',passwordChangeRequired:!expired,temporaryPasswordExpired:expired},428);}
  const result=s=>({state:Crew.projection(s,access.workerId,access.manager,access.technician),manager:access.manager,technician:!!access.technician,workerId:access.workerId,storage:'cloud',emailConfigured:access.manager?emailReady():undefined});
  if(req.method==='GET')return respond(result(state));if(req.method!=='POST')return respond({error:'Method not allowed.'},405);
  try{verifyOrigin(req);}catch{return respond({error:'This request must come from GolfOptix.'},403);}
  if(!req.headers.get('Content-Type')?.startsWith('application/json'))return respond({error:'Send a JSON request.'},415);const raw=await req.text();if(new TextEncoder().encode(raw).length>250000)return respond({error:'This request is too large.'},413);let body;try{body=JSON.parse(raw);}catch{return respond({error:'Could not read this request.'},400);}
  if(!body||typeof body!=='object'||Array.isArray(body))return respond({error:'Choose a crew action.'},400);
  if(!Crew.mayAct(state,body.command,access))return respond({error:'You may log work and submit closure only for your own assigned tickets. Manager approval is required to close work.'},403);
  if(state.events.some(e=>e.commandId===body.command?.commandId))return respond(result(state));if(body.revision!==state.revision)return respond({error:'Crew changed in another session. Refresh before saving.',conflict:true},409);if(entry&&!entry.etag)return respond({error:'Could not safely check the crew version.'},503);
  // A manager may not use a worker profile to change their own delegated access.
  if(access.workerId&&body.command?.id===access.workerId&&['worker.save','worker.archive'].includes(body.command.action))return respond({error:'A superintendent must change your own personnel profile or access.'},403);
  let next;try{next=Crew.apply(state,body.command,{id:user.id,name:state.workers[access.workerId]?.name||user.name||user.userMetadata?.full_name||'User'},now(),access);}catch(e){return respond({error:e.message},/another session|Refresh|changed/.test(e.message)?409:400);}
  const saved=await store.setJSON('courses/'+course,next,entry?{onlyIfMatch:entry.etag}:{onlyIfNew:true});if(!saved.modified)return respond({error:'Another edit arrived first. Refresh before saving.',conflict:true},409);
  const confirmed=await readCrew(store,course);if(!confirmed.state.events.some(e=>e.commandId===body.command.commandId))return respond({error:'Could not confirm this save. Refresh before retrying.'},503);return respond(result(confirmed.state));
 }catch{return respond({error:'Crew storage is temporarily unavailable. No successful save is being claimed. Please retry.'},503);}
};}
