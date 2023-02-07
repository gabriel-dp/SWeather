import axios from 'axios';
import requestOptions from './requestOptions';

// sunriseTime and sunsetTime are propertiers that are avaliable only at timesteps of 1 day
// But the free plan allow only 6 hours on the past
// The trick here is make the request with the T09:00:00Z of tomorrow and the T09:00:00Z of the next day, which will give only the sunTimes of tomorrow

function getTomorrowIsoDateAt0900(date) {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + 1);
	newDate.setHours(6);
	newDate.setMinutes(0);
	newDate.setSeconds(0);
	return newDate.toISOString();
}

export default async function getSunTimes(timeInterval, coords) {
	const options = requestOptions(timeInterval, coords);

	const startTime = getTomorrowIsoDateAt0900(options.interval[0]);
	const endTime = getTomorrowIsoDateAt0900(startTime);

	const url = `https://api.tomorrow.io/v4/timelines/?location=${options.location.join()}&fields=sunriseTime,sunsetTime&timesteps=1d&startTime=${startTime}&endTime=${endTime}&apikey=${
		options.apikey
	}
	`;

	const promise = axios.get(url).then((response) => response.data.data.timelines[0].intervals);
	const dataPromise = promise;

	return dataPromise;
}
