import {randomBytes,randomUUID} from 'node:crypto';
import {crewStore,readCrew,mutateCrew} from './crew-store.mjs';
import catalog from '../../public/course-catalog.json' with {type:'json'};
export const emailReady=()=>!!(process.env.RESEND_API_KEY&&process.env.CREW_EMAIL_FROM);
const SITE='https://golfoptix.com';
export function crewAccountLink(trackId){const course=catalog.courses.find(c=>!c.publicDemo&&c.tracks.some(t=>t.id===trackId&&t.available));if(!course)throw Error('Crew course is not available.');return SITE+'/login/?'+new URLSearchParams({setup:'crew',course:course.id,track:trackId});}
export async function sendCrewEmail({to,subject,text,key},fetcher=fetch){if(!emailReady())throw Error('Email service is not connected.');await new Promise(resolve=>setTimeout(resolve,600));const r=await fetcher('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':key},body:JSON.stringify({from:process.env.CREW_EMAIL_FROM,to:[to],subject,text}),signal:AbortSignal.timeout(8000)});if(!r.ok)throw Error('Email service did not confirm acceptance.');const result=await r.json();if(!result.id)throw Error('Email acceptance could not be confirmed.');return result.id;}
async function findUser(admin,email){for(let page=1;page<=100;page++){const users=await admin.listUsers({page,perPage:50}),found=users.find(u=>u.email?.toLowerCase()===email);if(found)return found;if(users.length<50)return null;}throw Error('Account lookup needs administrator assistance.');}
function welcomeBody(worker,course,password){return `Welcome to GolfOptix, ${worker.name}.\n\nYour email address is your login: ${worker.email}\n${password?'Temporary password: '+password+'\nChange this password before opening your work. It expires in 72 hours. Never share it.\nUse the most recent welcome email if a replacement was issued.':'Your existing GolfOptix password has not changed. Use your usual password or the password recovery option.'}\n\n${password?'Finish setting up your account':'Open your crew account'}: ${crewAccountLink(course)}\nYour superintendent’s course and track are already selected. Your crew account has been created; you do not need to register again.\n\nYour superintendent has added you to this course crew. Your job title is ${worker.jobTitle}. If you were not expecting this invitation, contact your superintendent.\n\nGolfOptix · Grounded in Truth`;
}
function ticketBody(a,worker,course){return `GolfOptix work ticket\n\n${a.title}\nTicket: ${a.id}\nAssigned to: ${worker.name}\nDate: ${a.date}\nStarts: ${a.startTime} (America/New_York)\nPlanned duration: ${a.duration} minutes\nLocation: ${a.area||(a.hole?'Hole '+a.hole:'Course grounds')}\nStatus: ${a.status}\nType: ${a.maintenanceKind==='emergency'?'Emergency (unplanned)':a.maintenanceKind==='planned'?'Planned maintenance':'Not classified — legacy'}\n${a.eventHold&&!['completed','cancelled'].includes(a.status)?'Emergency report: review event work clearance with your superintendent before starting.\n':''}Latest activity: ${a.history?.at(-1)?.note||'See the ticket history.'}\n\n${a.notes||'See your superintendent for work instructions.'}\n\nView your ticket: ${SITE}/crew/?course=${encodeURIComponent(course)}&ticket=${encodeURIComponent(a.id)}\nThis message reflects the assignment when sent. Sign in to check its latest details.`;}
export async function dispatchCrew({getStore,admin,course,send=sendCrewEmail,ready=emailReady,now=()=>new Date().toISOString(),limit=3}){
 if(!ready())return{configured:false,processed:0};const store=crewStore(getStore);let processed=0;const started=Date.now();
 for(let turn=0;turn<limit;turn++){if(Date.now()-started>15000)break;
  const token=randomUUID();let selected=null;
  await mutateCrew(store,course,s=>{
   selected=null;let changed=false;
   // An expired welcome lease is not automatically retried with a new password:
   // the previous message may have been accepted. A manager must reissue it.
   for(const j of Object.values(s.outbox))if(j.status==='processing'&&Date.parse(j.leaseUntil)<=Date.parse(now())){j.status='unconfirmed';j.error='Previous delivery could not be confirmed. Reissue the welcome or review this ticket notification.';s.revision++;changed=true;}
   const job=Object.values(s.outbox).find(j=>j.status==='pending'&&j.type==='welcome')||Object.values(s.outbox).find(j=>j.status==='pending'&&s.workers[j.workerId]?.identityId);if(!job)return changed?s:null;
   const worker=s.workers[job.workerId],a=job.assignmentId?(job.type==='repair'?s.workOrders?.[job.assignmentId]:s.assignments[job.assignmentId]):null;
   if(!worker||worker.archived||(a&&a.version!==job.assignmentVersion)){job.status='cancelled';s.revision++;return s;}
   if(job.type!=='welcome'&&!worker.identityId)return null; // Welcome/account must be ready first.
   job.status='processing';job.lease=token;job.leaseUntil=new Date(Date.parse(now())+90000).toISOString();job.attempts++;s.revision++;selected={job:structuredClone(job),worker:structuredClone(worker),assignment:structuredClone(a)};return s;
  });
  if(!selected)break;const {job,worker,assignment}=selected;
  try{
   let recipientId=worker.identityId,password=null;
   if(job.type==='welcome'){
    let existing=recipientId?await admin.getUser(recipientId):await findUser(admin,worker.email);
    if(existing&&existing.email?.toLowerCase()!==worker.email)throw Error('The saved login identity does not match this worker email.');
    // Do not reset an existing user's chosen password. Only a still-temporary
    // Crew credential may be replaced by an explicitly reissued welcome job.
    if(!existing||existing.appMetadata?.crew_temp_required)password=randomBytes(24).toString('base64url')+'a9!';
    const membership={...(existing?.appMetadata?.crew_memberships||{}),[course]:worker.id};
    const roles=[...new Set([...(existing?.roles||[]),'crew'])];
    const metadata={...(existing?.appMetadata||{}),roles,crew_memberships:membership,...(password?{crew_temp_required:true,crew_temp_expires_at:new Date(Date.parse(now())+72*3600000).toISOString()}: {})};
    if(!existing)existing=await admin.createUser({email:worker.email,password,data:{app_metadata:metadata,user_metadata:{full_name:worker.name,requested_course:course,requested_track:course}}});
    recipientId=existing.id;await admin.updateUser(recipientId,{...(password?{password}:{}),app_metadata:metadata});
    await mutateCrew(store,course,s=>{const current=s.outbox[job.id];if(current?.lease!==token)throw Error('Invitation changed before account confirmation.');s.workers[worker.id].identityId=recipientId;s.revision++;return s;});
   }
   if(job.type!=='welcome'){const identity=await admin.getUser(recipientId);if(identity.email?.toLowerCase()!==worker.email)throw Error('The worker login email no longer matches the saved recipient.');}
   const providerId=await send({to:worker.email,subject:job.type==='welcome'?'Your GolfOptix crew login':`GolfOptix ticket: ${assignment.title}`,text:job.type==='welcome'?welcomeBody(worker,course,password):ticketBody(assignment,worker,course),key:'crew/'+course+'/'+job.id});
   await mutateCrew(store,course,s=>{const current=s.outbox[job.id];if(current?.lease===token){current.status='accepted';current.providerId=providerId;current.acceptedAt=now();delete current.lease;delete current.leaseUntil;s.revision++;}return s;});processed++;
  }catch{
   await mutateCrew(store,course,s=>{const current=s.outbox[job.id];if(current?.lease===token){current.status='unconfirmed';current.error='Email acceptance was not confirmed. Check the email service, then reissue the welcome or update the assignment to notify again.';delete current.lease;delete current.leaseUntil;s.revision++;}return s;});
  }
 }
 return{configured:true,processed};
}
