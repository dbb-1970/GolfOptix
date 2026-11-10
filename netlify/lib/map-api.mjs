import {randomUUID,createHash} from 'node:crypto';
import '../../public/assets/coverage-model.js';import '../../public/assets/maintenance-model.js';import '../../public/assets/shared-map-model.js';
import {canCourse} from './access.mjs';import source from './map-source-release.json' with {type:'json'};
export const MapModel=globalThis.GolfSharedMapModel,Maintenance=globalThis.GolfMaintenance;
export const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
export const mapStore=getStore=>getStore({name:'golfoptix-shared-map-v1',consistency:'strong'});
export const blankMap=course=>({version:1,course,sourceRelease:source.release,revision:0,state:Maintenance.blank(),audit:[],versions:[],operations:[]});
export async function readMap(store,course){const entry=await store.getWithMetadata('courses/'+course,{type:'json'}),document=entry?.data||blankMap(course);if(document.course!==course||document.sourceRelease!==source.release)throw Error('This shared map uses a different source release.');MapModel.clean(document.state);return{entry,document};}
const response=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store'}});
export function createMapHandler({getUser,verifyOrigin,getStore,now=()=>new Date().toISOString()}){return async req=>{try{
 const user=await getUser(),course=new URL(req.url).searchParams.get('course');if(!user)return response({error:'Sign in first.'},401);if(course!==source.course||!canCourse(user,course))return response({error:'Map access is not approved.'},403);
 const store=mapStore(getStore),{entry,document}=await readMap(store,course);
 if(req.method==='GET')return response({document,source,storage:'cloud'});if(req.method!=='POST')return response({error:'Method not allowed.'},405);try{verifyOrigin(req);}catch{return response({error:'This request must come from GolfOptix.'},403);}
 if(!req.headers.get('Content-Type')?.startsWith('application/json'))return response({error:'Send a JSON map edit.'},415);const raw=await req.text();if(Buffer.byteLength(raw)>2500000)return response({error:'Map edit is too large.'},413);let body;try{body=JSON.parse(raw);}catch{return response({error:'Invalid map edit.'},400);}
 if(!body||!['save','import','restore'].includes(body.action)||!/^MAP-[A-Za-z0-9_-]{6,100}$/.test(body.operationId||''))return response({error:'Choose a valid map action.'},400);
 if(document.operations.includes(body.operationId))return response({document,source,storage:'cloud'});
 if(body.expectedRevision!==document.revision)return response({error:'Another person changed this map. Your draft is preserved; refresh and review before applying it again.',conflict:true},409);
 if(entry&&!entry.etag)return response({error:'Cannot safely check the map version.'},503);
 let input=body.state;if(body.action==='restore'){if(!/^VER-[a-f0-9-]{36}$/.test(body.versionId||''))return response({error:'Choose a valid recovery version.'},400);const version=await store.getWithMetadata('versions/'+course+'/'+String(body.versionId||''),{type:'json'});if(!version||version.data.document.course!==course||hash(version.data.document)!==version.data.checksum)return response({error:'Recovery version is missing or damaged.'},400);input=structuredClone(version.data.document.state);for(const [id,a]of Object.entries(document.state.assets))if(!input.assets[id])input.assets[id]=a.custom?{...a,removed:true}:{id:a.id,type:a.type,label:a.sourceLabel||a.label,hole:a.hole,offset:{x:0,y:0},issues:a.issues,events:a.events};}
 if(body.action==='import'&&Object.keys(document.state.assets).length)return response({error:'A shared map already exists. Review the browser draft instead of overwriting colleagues’ edits.'},409);
 const actor={id:user.id,name:user.name||user.userMetadata?.full_name||'Superintendent'},at=now();let candidate;
 try{candidate=MapModel.change(document.state,input,actor,at,body.action==='restore'?'Restored map version':body.action==='import'?'Imported browser map':'Map edit',body.action==='import');}catch(e){return response({error:e.message},400);}
 // Restore is a deliberate whole-map replacement. Retain existing assets as hidden
 // records if they were absent in the historical overlay; audit is never erased.
 const versionId='VER-'+randomUUID(),archive={document,checksum:hash(document)};
 const archived=await store.setJSON('versions/'+course+'/'+versionId,archive,{onlyIfNew:true});if(!archived.modified)return response({error:'Could not create the safety version. Nothing was restored.'},503);
 const check=await store.getWithMetadata('versions/'+course+'/'+versionId,{type:'json'});if(!check||hash(check.data.document)!==archive.checksum)return response({error:'Safety version verification failed. No map change was committed.'},503);
 const next={...document,revision:document.revision+1,state:candidate.state,operations:[...document.operations,body.operationId].slice(-300),versions:[{id:versionId,revision:document.revision,at,actor,checksum:archive.checksum},...document.versions].slice(0,100),audit:[...document.audit,{id:body.operationId,at,actor,action:body.action,changedAssetIds:candidate.changed,previousRevision:document.revision,revision:document.revision+1}].slice(-1000)};
 const saved=await store.setJSON('courses/'+course,next,entry?{onlyIfMatch:entry.etag}:{onlyIfNew:true});if(!saved.modified)return response({error:'Another edit arrived first. Your draft is preserved.',conflict:true},409);
 const confirmed=await readMap(store,course);if(!confirmed.document.operations.includes(body.operationId))return response({error:'Could not confirm the shared save. Refresh before retrying.'},503);
 return response({document:confirmed.document,source,storage:'cloud'});
}catch{return response({error:'Shared map storage is unavailable. No successful save is being claimed.'},503);}};}
