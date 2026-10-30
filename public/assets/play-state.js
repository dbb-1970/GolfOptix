(function(root){'use strict';
function createPlaySession({now=()=>Date.now(),idleMs=15*60*1000,maxMs=60*60*1000,onExpire=()=>{}}={}){const values=new Map(),start=now();let last=start,ended=false;function check(){if(ended)return false;if(now()-last>=idleMs||now()-start>=maxMs){ended=true;values.clear();onExpire();return false;}return true;}return{getItem:k=>check()?(values.get(k)??null):null,setItem(k,v){if(!check())throw Error('Test Drive session ended.');values.set(k,String(v));},removeItem:k=>values.delete(k),touch(){if(check())last=now();},check,end(){ended=true;values.clear();},get ended(){return ended;}};}
root.GolfPlaySession={create:createPlaySession};if(typeof module!=='undefined')module.exports={create:createPlaySession};
})(globalThis);
