import {getUser} from '@netlify/identity';
import {getStore} from '@netlify/blobs';
import {createGoogleCallbackHandler} from '../lib/google-calendar-api.mjs';
export default createGoogleCallbackHandler({getUser,getStore});
export const config={path:'/api/google-calendar-callback'};
