(function(root){'use strict';
const copy=v=>JSON.parse(JSON.stringify(v)),safeId=s=>typeof s==='string'&&/^[A-Za-z0-9_.:-]{1,180}$/.test(s)&&!['__proto__','constructor','prototype'].includes(s);
function clean(input){root.GolfMaintenance.validate(input);const s={version:input.version,course:input.course,revision:input.revision,assets:{}};if(input.coverageScales)s.coverageScales=copy(input.coverageScales);if(Object.keys(input.assets).length>5000)throw Error('Too many map features.');
for(const [id,a]of Object.entries(input.assets)){if(!safeId(id)||a.label.length>300||Math.abs(a.offset.x)>1e7||Math.abs(a.offset.y)>1e7)throw Error('Invalid map feature.');const item={};for(const key of ['id','type','label','hole','sourceLabel','offset','custom','geometry','removed','connections','sourceSize','sourceBox','coverage'])if(a[key]!==undefined)item[key]=copy(a[key]);item.issues=copy(a.issues.filter(i=>!i.sharedId));item.events=copy(a.events.filter(e=>!e.sharedEventId));if(item.issues.length>1000||item.events.length>2000)throw Error('Map history is too large.');s.assets[id]=item;}return root.GolfMaintenance.validate(s);}
function geometry(input){const s=clean(input);for(const a of Object.values(s.assets)){a.events=[];a.issues=[];}return s;}
function same(a,b){return JSON.stringify(a)===JSON.stringify(b);}
function change(previous,input,actor,at,action='Map edit',legacy=false){const next=clean(input),before=clean(previous),ids=[...new Set([...Object.keys(before.assets),...Object.keys(next.assets)])],changed=[];
for(const id of ids){const a=next.assets[id],old=before.assets[id];if(!a){if(old)throw Error('Use reversible removal rather than deleting map history.');continue;}
 const one=s=>{if(!s)return null;const c=copy(s);delete c.events;delete c.issues;return c;};
 if(!same(one(a),one(old))){changed.push(id);a.events=old?copy(old.events):legacy?a.events.map(e=>({...e,author:'Legacy browser record: '+String(e.author||'unknown').slice(0,120),provenance:'unverified-browser'})):[];a.events.push({kind:action,at,author:actor.name,actorId:actor.id,provenance:'authenticated-server',note:action+' · shared course map'});}else a.events=copy(old.events);
 if(old)a.issues=copy(old.issues);else if(!legacy)a.issues=[];
}
return{state:next,changed};}
root.GolfSharedMapModel={clean,geometry,change,same};if(typeof module!=='undefined')module.exports=root.GolfSharedMapModel;
})(globalThis);
