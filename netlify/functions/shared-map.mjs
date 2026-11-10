import {getUser,verifyRequestOrigin} from '@netlify/identity';import {getStore} from '@netlify/blobs';import {createMapHandler} from '../lib/map-api.mjs';
export default createMapHandler({getUser,verifyOrigin:verifyRequestOrigin,getStore});export const config={path:'/api/shared-map'};
