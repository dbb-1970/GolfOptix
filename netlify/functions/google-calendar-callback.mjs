import{resolveCourseUser}from'../lib/resolved-access.mjs';
import {getUser as identityGetUser} from '@netlify/identity';
import {getStore} from '@netlify/blobs';
import {createGoogleCallbackHandler} from '../lib/google-calendar-api.mjs';
const getUser=()=>resolveCourseUser(identityGetUser,getStore);
export default createGoogleCallbackHandler({getUser,getStore});
export const config={path:'/api/google-calendar-callback'};
