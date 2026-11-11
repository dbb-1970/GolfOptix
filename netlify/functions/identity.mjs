import{getStore}from'@netlify/blobs';import{initialRoles}from'../lib/access.mjs';import{recordOwnerEvent}from'../lib/owner-alerts.mjs';
async function notify(user,kind){try{await recordOwnerEvent({getStore,user,kind});}catch{console.error('GolfOptix owner-notification queue could not be confirmed.');}}
export default {
 async userValidate(event){const p=event.user.userMetadata||{};if(!initialRoles(event.user.email).length&&(!String(p.requested_course||'').trim()||!String(p.requested_track||'').trim()||!String(p.full_name||'').trim()))return event.deny();await notify(event.user,'validate');},
 async userSignup(event){await notify(event.user,'signup');return{user:{...event.user,appMetadata:{...event.user.appMetadata,roles:initialRoles(event.user.email),courses:[]}}};},
 async userModified(event){await notify(event.user,'profile');}
};
