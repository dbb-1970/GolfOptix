import{getUser,verifyRequestOrigin}from'@netlify/identity';import{getStore}from'@netlify/blobs';import{createChemicalDocumentHandler}from'../lib/chemical-document-api.mjs';
export default createChemicalDocumentHandler({getUser,getStore,verifyOrigin:verifyRequestOrigin});export const config={path:'/api/chemical-documents'};
