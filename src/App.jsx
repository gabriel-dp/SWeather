import { useEffect, useState } from 'react';

import WeatherBackground from './components/WeatherBackground';

import getWeatherData from './utils/requestWeather';
import { getISOIntervalFromNow } from './utils/ISO8601';

function App() {
	const TIME_INTERVAL_HOURS = 6;

	const [APIdata, setAPIdata] = useState();
	useEffect(() => {
		if (!APIdata) {
			const options = {
				apikey: 'K0BKOLcvnW2dswAega7fkYkTm4eTKv1T',
				fields: ['windSpeed', 'temperature', 'humidity', 'cloudCover', 'sunriseTime', 'sunsetTime'],
				location: [-21.129384, -44.246503],
				interval: [
					getISOIntervalFromNow(TIME_INTERVAL_HOURS).past,
					getISOIntervalFromNow(TIME_INTERVAL_HOURS).future,
				],
				timesteps: '1h',
				units: 'metric',
			};
			console.log('request');
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

	useEffect(() => {
		console.log(weatherData);
	}, [weatherData]);

	const INTERVAL = 2;

	return (
		<div>
			{weatherData && (
				<WeatherBackground
					time={weatherData[INTERVAL].time}
					sunriseTime={weatherData[INTERVAL].sunriseTime}
					sunsetTime={weatherData[INTERVAL].sunsetTime}
					cloudCover={weatherData[INTERVAL].cloudCover}
				>
					<p>
						{weatherData[INTERVAL].temperature}|{weatherData[INTERVAL].humidity}|
						{weatherData[INTERVAL].cloudCover}
					</p>
				</WeatherBackground>
			)}
		</div>
	);
}

export default App;
