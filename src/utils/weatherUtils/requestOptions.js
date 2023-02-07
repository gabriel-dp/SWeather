import { getISOIntervalFromNow } from '../timeUtils';

const requestOptions = (timeInterval, coords) => ({
	apikey: import.meta.env.VITE_API_KEY,
	fields: [
		'windSpeed',
		'temperature',
		'humidity',
		'cloudCover',
		'rainIntensity',
		'freezingRainIntensity',
		'snowIntensity',
		'precipitationType',
		'weatherCode', // get thunderstorms
		'precipitationProbability',
	],
	location: coords,
	interval: getISOIntervalFromNow(timeInterval),
	timesteps: '1h',
	units: 'metric',
});

export default requestOptions;
