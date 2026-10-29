import {logout,refreshSession} from './identity-sdk.js';
try{await refreshSession();const r=await fetch('/api/session',{cache:'no-store'});if(!r.ok){location.replace('/login/');throw Error('Sign in required');}const u=await r.json();if(!u.courses.some(c=>c.id==='kings-ridge-kings')){location.replace('/account/');throw Error('Course approval required');}
// Partition local course state and backup databases by authenticated account.
GolfMaintenance.KEY+=':'+u.id;window.GOLF_ACCOUNT_ID=u.id;
window.golfAuthSignout=async()=>{await logout();location.replace('/login/');};
const author=document.getElementById('maintenance-author');if(author){author.value=u.name;author.readOnly=true;}
for(const path of ['/assets/course.js','/assets/maintenance.js','/assets/backup-ui.js'])await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=path+'?v=auth1';s.onload=resolve;s.onerror=reject;document.body.append(s);});
}catch{const e=document.getElementById('map-loading');if(e)e.textContent='Please sign in with an approved course account.';}
