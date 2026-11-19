import{resolveCourseUser}from'../lib/resolved-access.mjs';
import {getUser as identityGetUser,verifyRequestOrigin} from '@netlify/identity';import {getStore} from '@netlify/blobs';import {createMapHandler} from '../lib/map-api.mjs';
const getUser=()=>resolveCourseUser(identityGetUser,getStore);
export default createMapHandler({getUser,verifyOrigin:verifyRequestOrigin,getStore});export const config={path:'/api/shared-map'};
