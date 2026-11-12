import '../../public/assets/calendar-model.js';
import {readCrew,crewStore} from './crew-store.mjs';
import {canCourse} from './access.mjs';
import catalog from '../../public/course-catalog.json' with {type:'json'};
const M=globalThis.GolfCalendar,headers={'Cache-Control':'no-store','Content-Type':'application/json'};
const response=(value,status=200)=>Response.json(value,{status,headers});
const courses=new Set(catalog.courses.filter(c=>!c.publicDemo).flatMap(c=>c.tracks.filter(t=>t.available).map(t=>t.id)));
export function createCalendarHandler({getUser,verifyOrigin,getStore,now=()=>new Date().toISOString()}){
 return async req=>{
  try{
   const user=await getUser();if(!user)return response({error:'Sign in to open the calendar.'},401);
   const course=new URL(req.url).searchParams.get('course');if(!courses.has(course)||!canCourse(user,course))return response({error:'This course calendar is not available to this account.'},403);
   if(!['GET','POST'].includes(req.method))return response({error:'Method not allowed.'},405);
   if(req.method==='POST'){try{verifyOrigin(req);}catch{return response({error:'The request must come from GolfOptix.'},403);}}
   const store=getStore({name:'golfoptix-maintenance-calendar-v1',consistency:'strong'}),key='courses/'+course;const entry=await store.getWithMetadata(key,{type:'json'});const state=entry?M.validate(entry.data,course):M.blank(course);
   if(req.method==='GET')return response({state,storage:'cloud'});
   if(entry&&!entry.etag)return response({error:'Could not safely check the calendar version. Please retry.'},503);
   if(!req.headers.get('Content-Type')?.startsWith('application/json'))return response({error:'Send a JSON calendar request.'},415);
   const raw=await req.text();if(new TextEncoder().encode(raw).length>100000)return response({error:'This calendar request is too large.'},413);
   let body;try{body=JSON.parse(raw);}catch{return response({error:'The calendar request could not be read.'},400);}
   if(!body||typeof body!=='object'||Array.isArray(body))return response({error:'Send a calendar command.'},400);
   if(state.events.some(e=>e.commandId===body.command?.commandId))return response({state,storage:'cloud'});
   if(body.revision!==state.revision)return response({error:'Someone updated this calendar. Refresh the calendar before saving again.',conflict:true},409);
   let next;try{if(body.command.action==='reschedule'){const shared=(await readCrew(crewStore(getStore),course)).state,plan=state.schedules[body.command.id];if(plan){const candidate={...plan,date:body.command.date,startTime:body.command.startTime,status:'planned'};const blocked=globalThis.GolfEvents.overlaps(shared,candidate);if(blocked.length)throw Error('This date and time overlap a blocked course event: '+blocked.map(e=>e.title).join(', ')+'. Choose another time.');}}next=M.apply(state,body.command,{id:user.id,name:user.name||user.userMetadata?.full_name||'Superintendent'},now());}catch(e){return response({error:e.message},e.message.includes('another session')?409:400);}
   const result=await store.setJSON(key,next,entry?{onlyIfMatch:entry.etag}:{onlyIfNew:true});if(!result.modified)return response({error:'Another edit arrived first. Refresh the calendar before saving again.',conflict:true},409);
   // Confirm persistence rather than treating an SDK write response alone as proof of saving.
   const confirmed=await store.getWithMetadata(key,{type:'json'});if(!confirmed?.data.events?.some(e=>e.commandId===body.command.commandId))return response({error:'Could not confirm the save. Refresh the calendar before retrying.'},503);
   return response({state:M.validate(confirmed.data,course),storage:'cloud'});
  }catch{return response({error:'The shared calendar is temporarily unavailable. Your browser will not claim this change was saved. Please retry.'},503);}
 };
}
