import {createHash} from 'node:crypto';
const digest=s=>createHash('sha256').update(String(s||'').trim().toLowerCase()).digest('hex');
export const ADMIN_HASH='a97282f35d67e4fb05bfe0248184d40f714188ba7bc53e47c783cdc977f3bf26',JAKE_HASH='848fa7974f0a4d8e90c2df5692473b464cd7789864471878988a38ce1433379e';
export function initialRoles(email){const h=digest(email);return h===ADMIN_HASH?['admin']:h===JAKE_HASH?['kings-member']:[];}
export function canCourse(user,id){return !!(user&&(user.roles?.includes('admin')||(id==='kings-ridge-kings'&&user.roles?.includes('kings-member'))|| (id!=='kings-ridge-kings'&&user.appMetadata?.courses?.includes(id))));}
export function publicUser(u){return {id:u.id,email:u.email,name:u.name||u.userMetadata?.full_name||'',profile:u.userMetadata||{},admin:!!u.roles?.includes('admin'),courses:canCourse(u,'kings-ridge-kings')?[{id:'kings-ridge-kings',name:'Kings Ridge Golf Club — Kings Course',url:'/course/'}]:[]};}
