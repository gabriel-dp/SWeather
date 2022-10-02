import axios from 'axios';

async function getWeatherData(options) {
	const promise = axios.get(
		`https://api.tomorrow.io/v4/timelines/?location=${options.location.join()}&fields=${options.fields.join()}&timesteps=${
			options.timesteps
		}&units=${options.units}&startTime=${options.interval[0]}&endTime=${
			options.interval[1]
		}&apikey=${options.apikey}
            `
	);

	const dataPromise = promise.then((response) => response.data.data.timelines[0].intervals);

	return dataPromise;
}

export default getWeatherData;
