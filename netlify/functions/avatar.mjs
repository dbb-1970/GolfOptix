import{getUser,verifyRequestOrigin}from'@netlify/identity';import{getStore}from'@netlify/blobs';import{createAvatarHandler}from'../lib/avatar-api.mjs';
export default createAvatarHandler({getUser,getStore,verifyOrigin:verifyRequestOrigin});export const config={path:'/api/avatar'};
