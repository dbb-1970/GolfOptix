import{getStore}from'@netlify/blobs';
import{createPilotHandler,limitPilot}from'../lib/pilot-signup.mjs';
import{recordPilotEvent}from'../lib/owner-alerts.mjs';
export default createPilotHandler({limit:(req,at)=>limitPilot(getStore,req.headers.get('x-nf-client-connection-ip')||'unknown',at),record:({id,data,at})=>recordPilotEvent({getStore,id,data,at})});
