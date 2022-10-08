import axios from 'axios';
import { getISOIntervalFromNow } from '../timeUtils';

async function getRawData(timeInterval) {
	const options = {
		// apikey: 'K0BKOLcvnW2dswAega7fkYkTm4eTKv1T',
		apikey: '88m0aqRGnU9HxVeMenXLYhhsB7UIUA4a',
		fields: [
			'windSpeed',
			'temperature',
			'humidity',
			'cloudCover',
			'sunriseTime',
			'sunsetTime',
			'rainIntensity',
			'freezingRainIntensity',
			'snowIntensity',
			'precipitationType',
			'weatherCode', // get thunderstorms
		],
		location: [-21.129384, -44.246503],
		interval: getISOIntervalFromNow(timeInterval),
		timesteps: '1h',
		units: 'metric',
	};

	const url = `https://api.tomorrow.io/v4/timelines/?location=${options.location.join()}&fields=${options.fields.join()}&timesteps=${
		options.timesteps
	}&units=${options.units}&startTime=${options.interval[0]}&endTime=${options.interval[1]}&apikey=${
		options.apikey
	}
	`;

	const promise = axios.get(url).then((response) => response.data.data.timelines[0].intervals);
	const dataPromise = promise;

	return dataPromise;
}

export default getRawData;
