import {logout,refreshSession} from './identity-sdk.js';
try{await refreshSession();const r=await fetch('/api/session',{cache:'no-store'});if(!r.ok){location.replace('/login/');throw Error('Sign in required');}const u=await r.json();if(!u.courses.some(c=>c.id==='kings-ridge-kings')){location.replace('/account/');throw Error('Course approval required');}
const activeTrack=u.courses.find(c=>c.id==='kings-ridge-kings');document.getElementById('workspace-course').textContent=activeTrack.courseName||'Kings Ridge Golf Club';document.getElementById('workspace-track').textContent=activeTrack.trackName||'Kings Course';
// Partition local course state and backup databases by authenticated account.
GolfMaintenance.KEY+=':'+u.id;window.GOLF_ACCOUNT_ID=u.id;window.GOLF_SHARED_MAP=true;
window.golfAuthSignout=async()=>{await logout();location.replace('/login/');};
const author=document.getElementById('maintenance-author');if(author){author.value=u.name;author.readOnly=true;}
for(const path of ['/assets/shared-map-model.js','/assets/shared-map.js'])await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=path+'?v=ops2';s.onload=resolve;s.onerror=reject;document.body.append(s);});
window.GOLF_SHARED_INITIAL=await GolfSharedMap.init();
for(const path of ['/assets/course.js','/assets/pump-model.js','/assets/operations-model.js','/assets/chemical-model.js','/assets/crew-model.js','/assets/work-orders.js','/assets/maintenance.js','/assets/map-work-orders.js','/assets/mobile-workspace.js','/assets/map-help.js','/assets/coverage.js','/assets/map-labels.js','/assets/pump-map.js','/assets/recovery-ui.js','/assets/backup-ui.js'])await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=path+'?v=ops2';s.onload=resolve;s.onerror=reject;document.body.append(s);});
await golfCourse.reload();
}catch(error){const e=document.getElementById('map-loading');if(e)e.textContent='Could not open the shared course. '+error.message;}
