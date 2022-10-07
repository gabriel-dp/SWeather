import { useEffect } from 'react';

import usePersistedState from './utils/customHooks/usePersistedState';
import getWeatherData from './utils/requestWeather';
import { getTimeNow } from './utils/ISO8601';

import WeatherBackground from './components/WeatherBackground';

function App() {
	const TIME_INTERVAL_HOURS = 6;

	const [weatherData, setWeatherData] = usePersistedState('previousAPIdata');
	useEffect(() => {
		const previousDataIsValid =
			weatherData &&
			getTimeNow().raw.getTime() <
				new Date(weatherData[TIME_INTERVAL_HOURS].time).getTime() + 1000 * 60 * 60; // checks if data is more than 1 hour late
		if (!previousDataIsValid) {
			getWeatherData(TIME_INTERVAL_HOURS).then((data) => setWeatherData(data));
		}
	});

	return <div>{weatherData && <WeatherBackground weatherData={weatherData[6]} />}</div>;
}

export default App;
