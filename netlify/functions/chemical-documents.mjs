import{resolveCourseUser}from'../lib/resolved-access.mjs';
import{getUser as identityGetUser,verifyRequestOrigin}from'@netlify/identity';import{getStore}from'@netlify/blobs';import{createChemicalDocumentHandler}from'../lib/chemical-document-api.mjs';
const getUser=()=>resolveCourseUser(identityGetUser,getStore);
export default createChemicalDocumentHandler({getUser,getStore,verifyOrigin:verifyRequestOrigin});export const config={path:'/api/chemical-documents'};
