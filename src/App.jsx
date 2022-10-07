import { useEffect, useState } from 'react';

import usePersistedState from './utils/customHooks/usePersistedState';
import getWeatherData from './utils/requestWeather';
import { getTimeNow } from './utils/ISO8601';

import WeatherBackground from './components/WeatherBackground';

function App() {
	const TIME_INTERVAL_HOURS = 6;

	const [actualInterval, setActualInterval] = useState(TIME_INTERVAL_HOURS);
	const handleChangeActualInterval = (value) => {
		setActualInterval(value);
	};

	const [weatherData, setWeatherData] = usePersistedState('previousAPIdata', []);
	useEffect(() => {
		const previousDataIsValid =
			weatherData.length === TIME_INTERVAL_HOURS * 2 + 1 && // checks if previous data is valid and checks interval changes
			getTimeNow().raw.getTime() <
				new Date(weatherData[TIME_INTERVAL_HOURS].time).getTime() + 1000 * 60 * 60; // checks if data is more than 1 hour late
		if (!previousDataIsValid) {
			getWeatherData(TIME_INTERVAL_HOURS).then((data) => {
				setWeatherData(data);
				setActualInterval(TIME_INTERVAL_HOURS);
			});
		}
	});

	return (
		<div>
			{weatherData.length !== 0 && (
				<WeatherBackground
					weatherData={weatherData[actualInterval]}
					timeInterval={TIME_INTERVAL_HOURS}
					actualInterval={actualInterval}
					handleChangeActualInterval={handleChangeActualInterval}
				/>
			)}
		</div>
	);
}

export default App;
