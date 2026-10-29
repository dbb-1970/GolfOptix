import {initialRoles} from '../lib/access.mjs';
export default {
 userValidate(event){const p=event.user.userMetadata||{};if(initialRoles(event.user.email).length)return;if(!String(p.requested_course||'').trim()||!String(p.full_name||'').trim())return event.deny();},
 userSignup(event){return {user:{...event.user,appMetadata:{...event.user.appMetadata,roles:initialRoles(event.user.email),courses:[]}}};}
};
