import {randomUUID} from 'node:crypto';
import catalog from '../../public/course-catalog.json' with {type:'json'};
import {initialRoles,publicUser} from './access.mjs';
import {isOwner,ownerCandidate} from './owner-access.mjs';
const reply=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store'}});
const tracks=()=>catalog.courses.filter(c=>!c.publicDemo).flatMap(c=>c.tracks.filter(t=>t.available).map(t=>({id:t.id,name:c.name+' — '+t.name,url:t.url||'/maintenance/?course='+encodeURIComponent(t.id)})));
export function createOwnerActivationHandler({getUser,admin,verifyOrigin}){return async req=>{
 if(req.method!=='POST')return reply({error:'Method not allowed.'},405);
 const me=await getUser();if(!ownerCandidate(me))return reply({error:'Only the verified owner account can activate owner access.'},403);
 try{verifyOrigin(req);}catch{return reply({error:'Request must come from GolfOptix.'},403);}
 try{const current=await admin.getUser(me.id);if(!ownerCandidate(current))return reply({error:'Owner account verification changed. Sign in again.'},403);await admin.updateUser(current.id,{app_metadata:{...current.appMetadata,roles:[...new Set([...(current.roles||[]),'owner','admin'])],license_exempt:true}});return reply({ok:true,message:'Owner access activated. Sign out and sign back in to refresh access.'});}catch{return reply({error:'Owner activation could not be confirmed. Please retry.'},503);}
};}
export function createAdminHandler({getUser,admin,verifyOrigin,getStore,now=()=>new Date().toISOString()}){return async req=>{
 const me=await getUser();if(!isOwner(me))return reply({error:'Owner access required.'},403);
 if(req.method==='GET'){try{const page=Math.max(1,Math.min(10000,Number(new URL(req.url).searchParams.get('page'))||1)),users=await admin.listUsers({page,perPage:50});return reply({users:users.map(u=>({id:u.id,email:u.email,name:u.name||u.userMetadata?.full_name||'',confirmed:!!u.confirmedAt,owner:isOwner(u),admin:isOwner(u),seatExempt:isOwner(u),approvedCourses:u.appMetadata?.courses||[],courses:publicUser(u).courses,profile:{requested_course:u.userMetadata?.requested_course||'',requested_track:u.userMetadata?.requested_track||''}})),page,courses:tracks()});}catch{return reply({error:'Accounts could not load. Retry.'},503);}}
 if(req.method!=='POST')return reply({error:'Method not allowed.'},405);
 try{verifyOrigin(req);}catch{return reply({error:'Request must come from GolfOptix.'},403);}
 let b;try{if(!req.headers.get('Content-Type')?.startsWith('application/json'))return reply({error:'Send a JSON request.'},415);const raw=await req.text();if(raw.length>4000)return reply({error:'Request too large.'},413);b=JSON.parse(raw);if(!b||typeof b.id!=='string'||b.id.length>200)throw Error();}catch{return reply({error:'Choose a valid account.'},400);}
 let u;try{u=await admin.getUser(b.id);}catch{return reply({error:'Account could not load.'},404);}
 if(!u.confirmedAt)return reply({error:'The account email must be verified first.'},400);
 if(ownerCandidate(u))return reply({error:'Use My account to manage the owner’s own password. Owner permissions cannot be changed here.'},403);
 if(b.action==='reset-password'){
  if(String(b.confirmEmail||'').trim().toLowerCase()!==String(u.email).toLowerCase())return reply({error:'Confirm the account email before resetting its password.'},400);
  if(typeof b.password!=='string'||b.password.length<8||b.password.length>128)return reply({error:'Choose a password with 8 to 128 characters.'},400);
  const store=getStore({name:'golfoptix-owner-admin-v1',consistency:'strong'}),key='password-resets/'+u.id;let record;
  try{record=await store.getWithMetadata(key,{type:'json'});if(record&&!record.etag)throw Error('Audit version unavailable');if(record&&Date.parse(now())-Date.parse(record.data.at)<60000)return reply({error:'Wait one minute before resetting this account again.'},429);const entry={id:randomUUID(),at:now(),actorId:me.id,targetId:u.id,status:'requested'};const saved=await store.setJSON(key,entry,record?{onlyIfMatch:record.etag}:{onlyIfNew:true});if(!saved.modified)return reply({error:'Another reset is in progress. Refresh.'},409);
   const metadata={...u.appMetadata,password_reset_at:entry.at,password_reset_by:me.id};delete metadata.crew_temp_required;delete metadata.crew_temp_expires_at;
   try{await admin.updateUser(u.id,{password:b.password,app_metadata:metadata});}catch{await store.setJSON(key,{...entry,status:'not_confirmed'});return reply({error:'Password reset was not confirmed. Please retry after one minute.'},503);}
   let auditConfirmed=true;try{await store.setJSON(key,{...entry,status:'completed'});}catch{auditConfirmed=false;}
   return reply({ok:true,auditConfirmed,message:'Password reset. Existing passwords are never displayed. The user can sign in with the new password.'});
  }catch{return reply({error:'Could not start an audited password reset. No password update was requested.'},503);}
 }
 if(b.action&&b.action!=='access')return reply({error:'Choose a supported account action.'},400);
 const course=String(b.course||'').trim().toLowerCase();if(!tracks().some(t=>t.id===course))return reply({error:'Choose an available course.'},400);
 if(course==='kings-ridge-kings'&&!initialRoles(u.email).includes('kings-member'))return reply({error:'Kings Ridge is reserved for its assigned user.'},403);
 try{const courses=new Set(u.appMetadata?.courses||[]);b.approve?courses.add(course):courses.delete(course);const roles=(u.roles||[]).filter(x=>x!=='kings-member');if(course==='kings-ridge-kings'&&b.approve)roles.push('kings-member');await admin.updateUser(u.id,{app_metadata:{...u.appMetadata,courses:[...courses],roles,access_updated_at:now(),access_updated_by:me.id}});return reply({ok:true});}catch{return reply({error:'Access update could not be confirmed.'},503);}
};}
