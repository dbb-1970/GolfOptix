import{resolveCourseUser}from'../lib/resolved-access.mjs';
import{getStore}from'@netlify/blobs';
import {getUser as identityGetUser} from '@netlify/identity';
import {createWeatherHandler} from '../lib/calendar-weather-api.mjs';
const getUser=()=>resolveCourseUser(identityGetUser,getStore);
export default createWeatherHandler({getUser});
export const config={path:'/api/calendar-weather'};
