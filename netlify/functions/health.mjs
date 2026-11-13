// No customer data, credentials or store keys are exposed by this liveness endpoint.
export default async()=>Response.json({service:'GolfOptix',status:'available',release:'owner-notification-routing-20261113',time:new Date().toISOString()},{headers:{'Cache-Control':'no-store'}});
export const config={path:'/api/health'};
