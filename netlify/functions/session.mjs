import {getUser,refreshSession} from '@netlify/identity';
import {publicUser} from '../lib/access.mjs';
export default async()=>{await refreshSession();const u=await getUser();return Response.json(u?publicUser(u):{error:'Sign in required'},{status:u?200:401,headers:{'Cache-Control':'no-store'}});};
export const config={path:'/api/session'};
