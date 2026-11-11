/* Calendar plans and occurrence records; no automatic equipment or chemical control. */
(function(root){
'use strict';
const types={coursework:'Course maintenance',pump:'Pump station service',watering:'Watering',pesticide:'Pesticide application',fertilizer:'Fertilizer application',equipment:'Equipment service',tool:'Tool service'};
const processes=[{"id": "watering", "label": "Watering / irrigation cycle", "type": "watering"}, {"id": "handwatering", "label": "Hand watering / syringing", "type": "watering"}, {"id": "insecticide", "label": "Insecticide application", "type": "pesticide"}, {"id": "herbicide-pre", "label": "Pre-emergent herbicide application", "type": "pesticide"}, {"id": "herbicide-post", "label": "Post-emergent herbicide application", "type": "pesticide"}, {"id": "fungicide", "label": "Fungicide application", "type": "pesticide"}, {"id": "nematicide", "label": "Nematicide application", "type": "pesticide"}, {"id": "growth-regulator", "label": "Plant growth regulator application", "type": "pesticide"}, {"id": "other-pesticide", "label": "Other pesticide application", "type": "pesticide"}, {"id": "granular-feed", "label": "Granular fertilizer application", "type": "fertilizer"}, {"id": "liquid-feed", "label": "Liquid / foliar fertilizer application", "type": "fertilizer"}, {"id": "other-feed", "label": "Other fertilizer application", "type": "fertilizer"}, {"id": "overseeding", "label": "Overseeding", "type": "coursework"}, {"id": "sodding", "label": "Sodding / turf repair", "type": "coursework"}, {"id": "core-aeration", "label": "Core aeration", "type": "coursework"}, {"id": "solid-aeration", "label": "Solid-tine aeration", "type": "coursework"}, {"id": "deep-aeration", "label": "Deep-tine aeration", "type": "coursework"}, {"id": "topdressing", "label": "Sand topdressing", "type": "coursework"}, {"id": "verticutting", "label": "Verticutting / dethatching", "type": "coursework"}, {"id": "grooming", "label": "Grooming / brushing", "type": "coursework"}, {"id": "mowing", "label": "Mowing", "type": "coursework"}, {"id": "rolling", "label": "Greens rolling", "type": "coursework"}, {"id": "bunkers", "label": "Bunker raking / edging / sand work", "type": "coursework"}, {"id": "cups", "label": "Cup / tee-marker relocation", "type": "coursework"}, {"id": "drainage", "label": "Drainage inspection / cleaning", "type": "coursework"}, {"id": "irrigation-check", "label": "Irrigation inspection / repair", "type": "coursework"}, {"id": "gardens", "label": "Garden / flowerbed care", "type": "coursework"}, {"id": "trees", "label": "Tree / shrub pruning", "type": "coursework"}, {"id": "ponds", "label": "Pond / water-feature care", "type": "coursework"}, {"id": "rocks", "label": "Rock-feature care", "type": "coursework"}, {"id": "debris", "label": "Leaf / debris cleanup", "type": "coursework"}, {"id": "soil-testing", "label": "Soil / water testing", "type": "coursework"}, {"id": "wetting", "label": "Wetting-agent application", "type": "coursework"}, {"id": "custom", "label": "Other course work / custom process", "type": "coursework"}];
const blank=course=>({version:1,course,revision:0,schedules:{},events:[]});
const clone=x=>JSON.parse(JSON.stringify(x));
function fail(message){throw Error(message);}
function text(v,label,max=4000,required=false){const s=String(v??'').trim();if(s.length>max)fail(label+' is too long.');if(required&&!s)fail(label+' is required.');return s;}
function date(v,label='date',required=true){const s=text(v,label,10,required);if(!s)return '';const d=new Date(s+'T12:00:00Z');if(!/^\d{4}-\d{2}-\d{2}$/.test(s)||!Number.isFinite(+d)||d.toISOString().slice(0,10)!==s)fail('Choose a valid '+label+'.');return s;}
function time(v){const s=String(v||'');if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(s))fail('Choose a valid start time.');return s;}
function number(v,label,min,max,optional=false){if(optional&&(v===''||v===null||v===undefined))return null;const n=Number(v);if(!Number.isFinite(n)||n<min||n>max)fail('Enter a valid '+label+'.');return n;}
function day(value=new Date(),zone='America/New_York'){const p=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(value)).map(x=>[x.type,x.value]));return `${p.year}-${p.month}-${p.day}`;}
const addDays=(d,n)=>{const x=new Date(date(d)+'T12:00:00Z');x.setUTCDate(x.getUTCDate()+n);return x.toISOString().slice(0,10);};
const weekday=d=>new Date(date(d)+'T12:00:00Z').getUTCDay();
const difference=(a,b)=>Math.round((+new Date(a+'T12:00:00Z')-new Date(b+'T12:00:00Z'))/86400000);
function clean(input,old){
 const type=old?.type||input.type;if(!types[type])fail('Choose the type of work.');
 const hole=number(input.hole??0,'hole number',0,18);if(!Number.isInteger(hole))fail('Choose a hole.');
 const area=text(input.area,'Area',160),title=text(input.title,'Plan name',160)||(processes.find(p=>p.id===(input.process??old?.process))?.label||types[type])+' · '+(area||(hole?'Hole '+hole:'Entire course'));
 const startsOn=date(input.startsOn,'first planned date'),startTime=time(input.startTime),duration=number(input.duration,'duration in minutes',1,1440);if(!Number.isInteger(duration))fail('Use whole minutes for duration.');
 const repeat=input.repeat||'none';if(!['none','daily','weekly','monthly'].includes(repeat))fail('Choose a repeat schedule.');const interval=repeat==='none'?1:number(input.interval??1,'repeat interval',1,12);if(!Number.isInteger(interval))fail('Use a whole repeat interval.');
 const weekdays=repeat==='weekly'?(Array.isArray(input.weekdays)?[...new Set(input.weekdays)]:[weekday(startsOn)]):[];if(repeat==='weekly'&&(!weekdays.length||!weekdays.every(x=>Number.isInteger(x)&&x>=0&&x<=6)))fail('Select at least one day of the week.');
 const until=date(input.until,'last repeat date',false);if(until&&until<startsOn)fail('The repeat end date must be on or after the first planned date.');
 const process=text(input.process??old?.process,'Process',80);if(process&&!processes.some(p=>p.id===process&&p.type===type))fail('Choose a process matching this work type.');const product=text(input.product,'Product',160,['pesticide','fertilizer'].includes(type));
 return {type,process,title,hole,area,zone:text(input.zone,'Watering zone',160),startsOn,startTime,duration,repeat,interval,weekdays,until,assignee:text(input.assignee,'Assigned to',120),product,quantity:number(input.quantity,'planned amount',0,1e9,true),unit:text(input.unit,'Amount unit',40),restrictions:text(input.restrictions,'Timing / site restrictions'),notes:text(input.notes,'Instructions')};
}
function occursOn(r,d){if(d<r.startsOn||(r.until&&d>r.until))return false;if(r.repeat==='none')return d===r.startsOn;const elapsed=difference(d,r.startsOn);if(r.repeat==='daily')return elapsed%r.interval===0;if(r.repeat==='weekly'){const a=addDays(r.startsOn,-((weekday(r.startsOn)+6)%7)),b=addDays(d,-((weekday(d)+6)%7));return difference(b,a)%(7*r.interval)===0&&r.weekdays.includes(weekday(d));}const a=new Date(r.startsOn+'T12:00:00Z'),b=new Date(d+'T12:00:00Z'),months=(b.getUTCFullYear()-a.getUTCFullYear())*12+b.getUTCMonth()-a.getUTCMonth(),last=new Date(Date.UTC(b.getUTCFullYear(),b.getUTCMonth()+1,0)).getUTCDate();return months%r.interval===0&&b.getUTCDate()===Math.min(a.getUTCDate(),last);}
function snapshot(r){return clone(clean(r,r));}
function validId(id,prefix){return typeof id==='string'&&new RegExp('^'+prefix+'-[a-zA-Z0-9-]{8,80}$').test(id);}
function apply(state,cmd,actor,at=new Date().toISOString()){
 if(!actor?.id)fail('A signed-in editor is required.');if(!cmd||!validId(cmd.id,'CAL')||!validId(cmd.commandId,'CMD'))fail('Invalid calendar request.');
 if(state.events.some(e=>e.commandId===cmd.commandId))return clone(state);
 const next=clone(state),old=next.schedules[cmd.id];if((old?.version||0)!==cmd.expectedVersion)fail('This plan changed in another session. Close it and open the latest version before saving.');
 const author={id:String(actor.id),name:text(actor.name||'Superintendent','Editor',160,true)};let r,changes={};
 if(cmd.action==='save'){
  const fields=clean(cmd.input||{},old);r={...fields,id:cmd.id,version:(old?.version||0)+1,archived:old?.archived||false,occurrences:old?.occurrences||{},createdAt:old?.createdAt||at,createdBy:old?.createdBy||author,updatedAt:at,updatedBy:author};
  for(const [key,value]of Object.entries(fields))if(JSON.stringify(old?.[key])!==JSON.stringify(value))changes[key]={before:old?.[key]??null,after:value};
 }else{
  if(!old)fail('Plan not found.');r=clone(old);r.version++;r.updatedAt=at;r.updatedBy=author;
  if(cmd.action==='archive'||cmd.action==='restore'){r.archived=cmd.action==='archive';changes.archived={before:old.archived,after:r.archived};}
  else if(cmd.action==='status'||cmd.action==='reschedule'){
   if(r.archived)fail('Restore this plan before changing an occurrence.');const sourceDate=date(cmd.sourceDate,'scheduled date');if(!occursOn(r,sourceDate)&&!r.occurrences[sourceDate])fail('That date is not part of this plan.');const previous=r.occurrences[sourceDate]||{status:'planned',date:sourceDate,startTime:r.startTime};let occurrence={...previous,updatedAt:at,updatedBy:author};
   if(cmd.action==='status'){
    if(!['planned','in-progress','done','skipped'].includes(cmd.status))fail('Choose a valid work status.');occurrence.status=cmd.status;occurrence.note=text(cmd.note,cmd.status==='skipped'?'Reason for skipping':'Completion notes',4000,cmd.status==='skipped'||(cmd.status==='done'&&['pesticide','fertilizer'].includes(r.type)));occurrence.actualQuantity=number(cmd.actualQuantity,'actual amount',0,1e9,true);
    if(cmd.status==='done'){occurrence.completedAt=at;occurrence.completedBy=author;occurrence.snapshot=snapshot(r);}else{delete occurrence.completedAt;delete occurrence.completedBy;delete occurrence.snapshot;}
   }else{if(previous.status==='done')fail('A completed record cannot be moved. Reopen it first if it needs correction.');occurrence.date=date(cmd.date,'new planned date');occurrence.startTime=time(cmd.startTime);occurrence.note=text(cmd.note,'Reason for moving',4000,true);}
   r.occurrences[sourceDate]=occurrence;changes.occurrence={sourceDate,before:clone(previous),after:clone(occurrence)};
  }else fail('Unknown calendar action.');
 }
 next.schedules[r.id]=r;next.revision++;next.events.push({commandId:cmd.commandId,scheduleId:r.id,action:cmd.action,at,author,version:r.version,changes});return next;
}
function occurrences(state,from,to,{archived=false}={}){
 date(from);date(to);if(to<from||difference(to,from)>366)fail('Choose a calendar range of a year or less.');const result=[];
 for(const r of Object.values(state.schedules)){if(r.archived&&!archived)continue;const dates=new Set(Object.keys(r.occurrences));for(let d=from;d<=to;d=addDays(d,1))if(occursOn(r,d))dates.add(d);
  for(const sourceDate of dates){const o=r.occurrences[sourceDate]||{},actualDate=o.date||sourceDate;if(actualDate<from||actualDate>to)continue;const fields=o.status==='done'&&o.snapshot?o.snapshot:r;result.push({...fields,id:r.id,sourceDate,date:actualDate,startTime:o.startTime||fields.startTime,status:o.status||'planned',occurrence:o,version:r.version,archived:r.archived});}
 }
 return result.sort((a,b)=>(a.date+' '+a.startTime).localeCompare(b.date+' '+b.startTime)||a.title.localeCompare(b.title));
}
function validate(state,course){if(state?.version!==1||state.course!==course||!Number.isInteger(state.revision)||state.revision<0||!state.schedules||Array.isArray(state.schedules)||!Array.isArray(state.events))fail('Invalid calendar data.');for(const [id,r]of Object.entries(state.schedules)){if(!validId(id,'CAL')||id!==r.id||!Number.isInteger(r.version)||r.version<1||!r.occurrences||Array.isArray(r.occurrences))fail('Invalid calendar plan.');clean(r,r);for(const [d,o]of Object.entries(r.occurrences)){date(d);if(!['planned','in-progress','done','skipped'].includes(o.status))fail('Invalid occurrence status.');if(o.date)date(o.date);if(o.startTime)time(o.startTime);}}return state;}
function csv(rows){return rows.map(row=>row.map(v=>{let s=String(v??'');if(/^[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}).join(',')).join('\r\n');}
const api={types,processes,blank,clean,apply,validate,occursOn,occurrences,day,addDays,weekday,difference,csv};root.GolfCalendar=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
