import {getUser,verifyRequestOrigin} from '@netlify/identity';
import {getStore} from '@netlify/blobs';
import {createGoogleCalendarHandler} from '../lib/google-calendar-api.mjs';
export default createGoogleCalendarHandler({getUser,verifyOrigin:verifyRequestOrigin,getStore});
export const config={path:'/api/google-calendar'};
