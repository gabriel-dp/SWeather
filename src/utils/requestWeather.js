import axios from 'axios';
import { getISOIntervalFromNow } from './ISO8601';

async function getWeatherData(timeInterval) {
	const options = {
		apikey: 'K0BKOLcvnW2dswAega7fkYkTm4eTKv1T',
		// apikey: '88m0aqRGnU9HxVeMenXLYhhsB7UIUA4a',
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

	const promise = axios.get(url);
	const dataPromise = promise.then((response) => {
		const originalData = response.data.data.timelines[0].intervals;
		const tempData = [];
		originalData.forEach((interval) => {
			const tempObject = { ...interval.values };
			Object.assign(tempObject, { time: interval.startTime });
			tempData.push(tempObject);
		});
		return tempData;
	});

	return dataPromise;
}

export default getWeatherData;
