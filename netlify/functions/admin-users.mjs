import {getUser,admin,verifyRequestOrigin} from '@netlify/identity';
import {getStore} from '@netlify/blobs';
import {createAdminHandler} from '../lib/admin-api.mjs';
export default createAdminHandler({getUser,admin,getStore,verifyOrigin:verifyRequestOrigin});
export const config={path:'/api/admin/users'};
