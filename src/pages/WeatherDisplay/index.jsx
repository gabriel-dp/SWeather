import { useEffect, useState } from 'react';

import usePersistedState from '../../utils/customHooks/usePersistedState';
import getRawData from '../../utils/requestWeather';
import handleWeatherData from '../../utils/handleWeatherData';
import { getTimeNow } from '../../utils/ISO8601';

import WeatherBackground from '../../components/WeatherBackground';
import WeatherImage from '../../components/WeatherImage';
import TimeSlider from '../../components/TimeSlider';

import Screen from './styles';

function WeatherDisplay() {
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
			getRawData(TIME_INTERVAL_HOURS).then((data) => {
				setWeatherData(handleWeatherData(data));
				setActualInterval(TIME_INTERVAL_HOURS);
			});
		}
	});

	return (
		<Screen>
			{weatherData.length !== 0 && (
				<WeatherBackground weatherData={weatherData[actualInterval]}>
					<div
						style={{
							color: '#fff',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<h1>{weatherData[actualInterval].temperature}º</h1>
						<h1>{weatherData[actualInterval].place.city}</h1>
						<h3>
							{weatherData[actualInterval].place.state} -{' '}
							{weatherData[actualInterval].place.country}
						</h3>
					</div>
					<WeatherImage
						isDay={weatherData[actualInterval].isDay}
						cloudCover={weatherData[actualInterval].cloudCover}
					/>
					<TimeSlider
						timeInterval={TIME_INTERVAL_HOURS}
						actualInterval={actualInterval}
						handleChangeActualInterval={handleChangeActualInterval}
					/>
				</WeatherBackground>
			)}
		</Screen>
	);
}

export default WeatherDisplay;
