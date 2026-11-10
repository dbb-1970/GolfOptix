import {getUser,verifyRequestOrigin} from '@netlify/identity';import {getStore} from '@netlify/blobs';import {createRecoveryHandler} from '../lib/recovery-api.mjs';
export default createRecoveryHandler({getUser,verifyOrigin:verifyRequestOrigin,getStore});export const config={path:'/api/course-recovery'};
