// No customer data, credentials or store keys are exposed by this liveness endpoint.
export default async()=>Response.json({service:'GolfOptix',status:'available',release:'calendar-weather-20261111',time:new Date().toISOString()},{headers:{'Cache-Control':'no-store'}});
export const config={path:'/api/health'};
