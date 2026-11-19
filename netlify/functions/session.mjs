import{resolveCourseUser}from'../lib/resolved-access.mjs';
import{getStore}from'@netlify/blobs';
import {getUser as identityGetUser,refreshSession} from '@netlify/identity';
import {publicUser} from '../lib/access.mjs';
const getUser=()=>resolveCourseUser(identityGetUser,getStore);
export default async()=>{await refreshSession();const u=await getUser();return Response.json(u?publicUser(u):{error:'Sign in required'},{status:u?200:401,headers:{'Cache-Control':'no-store'}});};
export const config={path:'/api/session'};
