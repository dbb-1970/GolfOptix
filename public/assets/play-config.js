'use strict';
window.GOLF_COURSE_CONFIG={id:'juniper-cove-lakes',name:'Juniper Cove Golf Club — Lakes Course',courseName:'Juniper Cove Golf Club',trackName:'Lakes Course',revision:'demo-001',holes:18,assetPath:'/test-drive-assets/',pars:[4,5,4,3,4,3,4,5,4,4,4,3,5,4,5,3,4,4],partialHoles:[],fictional:true};
const play=GolfPlaySession.create({onExpire(){location.replace('/test-drive/?expired=1');}});window.GOLF_PLAY_STORAGE=play;window.GOLF_ACCOUNT_ID='test-drive';
for(const name of ['pointerdown','keydown','wheel','touchstart'])document.addEventListener(name,()=>play.touch(),{passive:true,capture:true});
setInterval(()=>play.check(),5000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)play.check();});window.addEventListener('pagehide',()=>play.end());window.addEventListener('pageshow',e=>{if(e.persisted)location.reload();});
window.GolfBackups={forCourse:()=>({ready:Promise.resolve(),activeFiles:()=>null,readMap:async name=>{if(!/^(overview\.svg|manifest\.json|(?:hole|card)-(?:0[1-9]|1[0-8])\.svg)$/.test(name))throw Error('Unknown test-drive map.');const r=await fetch('/test-drive-assets/'+name);if(!r.ok)throw Error('Demo map unavailable');return r.text();}})};
window.golfAuthSignout=()=>{play.end();location.assign('/');};
