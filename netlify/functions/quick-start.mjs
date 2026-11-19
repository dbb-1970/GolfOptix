import{resolveCourseUser}from'../lib/resolved-access.mjs';
import{getUser as identityGetUser,verifyRequestOrigin}from'@netlify/identity';import{getStore}from'@netlify/blobs';import{createQuickStartHandler}from'../lib/quick-start-api.mjs';const getUser=()=>resolveCourseUser(identityGetUser,getStore);
export default createQuickStartHandler({getUser,getStore,verifyOrigin:verifyRequestOrigin});export const config={path:'/api/quick-start'};
