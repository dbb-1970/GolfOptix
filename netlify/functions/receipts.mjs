import {getUser,verifyRequestOrigin} from '@netlify/identity';
import {getStore} from '@netlify/blobs';
import {createReceiptHandler} from '../lib/receipt-api.mjs';
export default createReceiptHandler({getUser,verifyOrigin:verifyRequestOrigin,getStore});
export const config={path:'/api/receipts'};
