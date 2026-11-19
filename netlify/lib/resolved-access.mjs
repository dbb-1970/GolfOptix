import{canCourse}from'./access.mjs';
import catalog from '../../public/course-catalog.json' with {type:'json'};
import{crewStore,readCrew}from'./crew-store.mjs';
// Derived on the server from manager-owned records on every request, never from profile metadata.
// Archiving or changing a Super back to Crew therefore revokes delegated access immediately.
export async function resolveCourseUser(getIdentityUser,getStore){const u=await getIdentityUser();if(!u)return null;const tracks=catalog.courses.filter(p=>!p.publicDemo).flatMap(p=>p.tracks.filter(t=>t.available));const store=crewStore(getStore),resolvedSuperCourses=[];for(const t of tracks){if(canCourse(u,t.id))continue;const{state}=await readCrew(store,t.id);const w=Object.values(state.workers).find(w=>w.identityId===u.id&&!w.archived);if(w?.accessLevel==='super')resolvedSuperCourses.push(t.id);}return{...u,resolvedSuperCourses};}
