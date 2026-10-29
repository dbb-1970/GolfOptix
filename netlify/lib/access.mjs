import catalog from '../../public/course-catalog.json' with {type:'json'};
import {createHash} from 'node:crypto';
const digest=s=>createHash('sha256').update(String(s||'').trim().toLowerCase()).digest('hex');
export const ADMIN_HASH='c3de0968d6449b98f3ac37e848005c1fde31481633828d2926d139c4f6fe39cc',JAKE_HASH='848fa7974f0a4d8e90c2df5692473b464cd7789864471878988a38ce1433379e';
export function initialRoles(email){const h=digest(email);return h===ADMIN_HASH?['admin']:h===JAKE_HASH?['kings-member']:[];}
export function canCourse(user,id){return !!(user&&(user.roles?.includes('admin')||(id==='kings-ridge-kings'&&user.roles?.includes('kings-member'))|| (id!=='kings-ridge-kings'&&user.appMetadata?.courses?.includes(id))));}
export function publicUser(u){return {id:u.id,email:u.email,name:u.name||u.userMetadata?.full_name||'',profile:u.userMetadata||{},admin:!!u.roles?.includes('admin'),courses:catalog.courses.flatMap(c=>c.tracks.filter(t=>t.available&&canCourse(u,t.id)).map(t=>({id:t.id,name:c.name+' — '+t.name,courseName:c.name,trackName:t.name,url:t.url})))};}
