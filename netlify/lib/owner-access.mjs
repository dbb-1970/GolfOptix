// Netlify's signed-claim fallback omits confirmedAt. Activation rechecks managed Identity.
export const OWNER_EMAIL='db@golfoptix.com';
export const ownerIdentity=u=>!!(u&&String(u.email||'').trim().toLowerCase()===OWNER_EMAIL);
export const ownerCandidate=u=>!!(ownerIdentity(u)&&u.confirmedAt);
export const mayActivateOwner=u=>ownerIdentity(u)&&(u.confirmedAt===undefined||!!u.confirmedAt);
export const isOwner=u=>ownerIdentity(u)&&u.roles?.includes('owner')===true&&!!(u.confirmedAt||Number.isFinite(Date.parse(u.appMetadata?.owner_verified_at||'')));
