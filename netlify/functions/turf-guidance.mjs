import{getStore}from'@netlify/blobs';import catalog from'../../public/course-catalog.json'with{type:'json'};import{refreshTurfGuidance}from'../lib/turf-guidance.mjs';
export default async()=>{for(const c of catalog.courses.filter(c=>!c.publicDemo))for(const t of c.tracks.filter(t=>t.available))await refreshTurfGuidance({getStore,course:t.id});};
export const config={schedule:'45 10 * * *'};
