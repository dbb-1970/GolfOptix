import {getUser} from '@netlify/identity';
import {createWeatherHandler} from '../lib/calendar-weather-api.mjs';
export default createWeatherHandler({getUser});
export const config={path:'/api/calendar-weather'};
