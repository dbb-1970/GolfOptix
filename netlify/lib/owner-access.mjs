// Owner identity is server-controlled and cannot be supplied in profile metadata.
export const OWNER_EMAIL='db@golfoptix.com';
export const ownerCandidate=u=>!!(u?.confirmedAt&&String(u.email||'').trim().toLowerCase()===OWNER_EMAIL);
export const isOwner=u=>ownerCandidate(u)&&u.roles?.includes('owner')===true;
