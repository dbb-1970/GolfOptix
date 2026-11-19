import{resolveCourseUser}from'../lib/resolved-access.mjs';
import {getUser as identityGetUser,verifyRequestOrigin} from '@netlify/identity';
import {getStore} from '@netlify/blobs';
import {createGoogleCalendarHandler} from '../lib/google-calendar-api.mjs';
const getUser=()=>resolveCourseUser(identityGetUser,getStore);
export default createGoogleCalendarHandler({getUser,verifyOrigin:verifyRequestOrigin,getStore});
export const config={path:'/api/google-calendar'};
