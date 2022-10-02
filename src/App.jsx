import { useEffect, useState } from 'react';
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
			getWeatherData(options).then((data) => setAPIdata(data));
		}
	});

	const [weatherData, setWeatherData] = useState();
	useEffect(() => {
		if (APIdata) {
			const tempData = [];
			APIdata.forEach((interval) => {
				tempData.push(interval.values);
			});
			setWeatherData(tempData);
		}
	}, [APIdata]);

	useEffect(() => {
		// console.log(getTimeNow().iso, getISOIntervalFromNow(6));
	});

	return (
		<div className="App">
			{weatherData && (
				<p>
					{weatherData[0].temperature}|{weatherData[0].humidity}|{weatherData[0].cloudCover}
				</p>
			)}
		</div>
	);
}

export default App;
