import{resolveCourseUser}from'../lib/resolved-access.mjs';
import {getUser as identityGetUser,verifyRequestOrigin} from '@netlify/identity';
import {getStore} from '@netlify/blobs';
import {createCrewHandler} from '../lib/crew-api.mjs';
import {emailReady} from '../lib/crew-email.mjs';
const getUser=()=>resolveCourseUser(identityGetUser,getStore);
export default createCrewHandler({getUser,verifyOrigin:verifyRequestOrigin,getStore,emailReady});
export const config={path:'/api/crew'};
