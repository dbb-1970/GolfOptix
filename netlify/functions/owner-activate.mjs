import {getUser,admin,verifyRequestOrigin} from '@netlify/identity';
import {createOwnerActivationHandler} from '../lib/admin-api.mjs';
export default createOwnerActivationHandler({getUser,admin,verifyOrigin:verifyRequestOrigin});
export const config={path:'/api/owner-activate'};
