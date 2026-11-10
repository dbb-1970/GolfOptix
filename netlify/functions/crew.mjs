import {getUser,verifyRequestOrigin} from '@netlify/identity';
import {getStore} from '@netlify/blobs';
import {createCrewHandler} from '../lib/crew-api.mjs';
import {emailReady} from '../lib/crew-email.mjs';
export default createCrewHandler({getUser,verifyOrigin:verifyRequestOrigin,getStore,emailReady});
export const config={path:'/api/crew'};
