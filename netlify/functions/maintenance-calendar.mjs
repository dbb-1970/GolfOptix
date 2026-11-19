import{resolveCourseUser}from'../lib/resolved-access.mjs';
import {getUser as identityGetUser,verifyRequestOrigin} from '@netlify/identity';
import {getStore} from '@netlify/blobs';
import {createCalendarHandler} from '../lib/calendar-api.mjs';
const getUser=()=>resolveCourseUser(identityGetUser,getStore);
export default createCalendarHandler({getUser,verifyOrigin:verifyRequestOrigin,getStore});
export const config={path:'/api/maintenance-calendar'};
