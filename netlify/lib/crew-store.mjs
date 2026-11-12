import '../../public/assets/pump-model.js';
import '../../public/assets/operations-model.js';
import '../../public/assets/chemical-model.js';
import '../../public/assets/pin-model.js';
import '../../public/assets/event-model.js';
import '../../public/assets/crew-model.js';
export const Crew=globalThis.GolfCrew;
export function crewStore(getStore){return getStore({name:'golfoptix-crew-v1',consistency:'strong'});}
export async function readCrew(store,course){const entry=await store.getWithMetadata('courses/'+course,{type:'json'});return{entry,state:entry?Crew.validate(entry.data,course):Crew.blank(course)};}
export async function mutateCrew(store,course,change){for(let attempt=0;attempt<6;attempt++){const {entry,state}=await readCrew(store,course);if(entry&&!entry.etag)throw Error('Crew storage version unavailable.');const next=await change(structuredClone(state));if(next===null)return null;const write=await store.setJSON('courses/'+course,next,entry?{onlyIfMatch:entry.etag}:{onlyIfNew:true});if(write.modified)return next;}throw Error('Crew records are busy. Refresh and try again.');}
