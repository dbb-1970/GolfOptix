import {getUser,admin,verifyRequestOrigin} from '@netlify/identity';
import {createCrewPasswordHandler} from '../lib/crew-password-api.mjs';
export default createCrewPasswordHandler({getUser,admin,verifyOrigin:verifyRequestOrigin});
export const config={path:'/api/crew-password'};
