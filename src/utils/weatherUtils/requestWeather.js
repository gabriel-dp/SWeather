import axios from 'axios';
import requestOptions from './requestOptions';

export default async function getRawData(timeInterval, coords) {
	const options = requestOptions(timeInterval, coords);

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
