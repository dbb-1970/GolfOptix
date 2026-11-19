import{resolveCourseUser}from'../lib/resolved-access.mjs';
import {getUser as identityGetUser,verifyRequestOrigin} from '@netlify/identity';
import {getStore} from '@netlify/blobs';
import {createReceiptHandler} from '../lib/receipt-api.mjs';
const getUser=()=>resolveCourseUser(identityGetUser,getStore);
export default createReceiptHandler({getUser,verifyOrigin:verifyRequestOrigin,getStore});
export const config={path:'/api/receipts'};
