import {getUser,verifyRequestOrigin} from '@netlify/identity';
import {getStore} from '@netlify/blobs';
import {createCalendarHandler} from '../lib/calendar-api.mjs';
export default createCalendarHandler({getUser,verifyOrigin:verifyRequestOrigin,getStore});
export const config={path:'/api/maintenance-calendar'};
