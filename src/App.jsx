import { useEffect, useState } from 'react';

import usePersistedState from './utils/customHooks/usePersistedState';
import getWeatherData from './utils/requestWeather';
import { getTimeNow, getISOIntervalFromNow } from './utils/ISO8601';

import WeatherBackground from './components/WeatherBackground';

function App() {
	const TIME_INTERVAL_HOURS = 6;

	const [APIdata, setAPIdata] = usePersistedState('previousAPIdata');
	useEffect(() => {
		const previousDataIsValid = !APIdata
			? false
			: !(getTimeNow().raw.getTime() > new Date(APIdata[6].startTime).getTime() + 1000 * 60 * 60); // checks if data is more than 1 hour late
		if (!previousDataIsValid) {
			const options = {
				apikey: 'K0BKOLcvnW2dswAega7fkYkTm4eTKv1T',
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
				interval: getISOIntervalFromNow(TIME_INTERVAL_HOURS),
				timesteps: '1h',
				units: 'metric',
			};
			getWeatherData(options).then((data) => setAPIdata(data));
		}
	});

	const [weatherData, setWeatherData] = useState();
	useEffect(() => {
		if (APIdata) {
			const tempData = [];
			APIdata.forEach((interval) => {
				const tempObject = { ...interval.values };
				Object.assign(tempObject, { time: interval.startTime });
				tempData.push(tempObject);
			});
			setWeatherData(tempData);
		}
	}, [APIdata]);

	return <div>{weatherData && <WeatherBackground weatherData={weatherData[6]} />}</div>;
}

export default App;
