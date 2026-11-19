import{resolveCourseUser}from'../lib/resolved-access.mjs';
import {getUser as identityGetUser,verifyRequestOrigin} from '@netlify/identity';import {getStore} from '@netlify/blobs';import {createRecoveryHandler} from '../lib/recovery-api.mjs';
const getUser=()=>resolveCourseUser(identityGetUser,getStore);
export default createRecoveryHandler({getUser,verifyOrigin:verifyRequestOrigin,getStore});export const config={path:'/api/course-recovery'};
