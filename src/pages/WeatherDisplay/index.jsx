import { useEffect, useState } from 'react';

import useBrowserStorage from '../../hooks/useBrowserStorage';
import getRawData from '../../utils/weatherUtils/requestWeather';
import handleWeatherData from '../../utils/weatherUtils/handleWeatherData';
import { getTimeNow } from '../../utils/timeUtils';

import WeatherBackground from '../../components/WeatherBackground';
import WeatherImage from '../../components/WeatherImage';
import TimeSlider from '../../components/TimeSlider';

import { Screen, DataText } from './styles';

function WeatherDisplay() {
	const TIME_INTERVAL_HOURS = 6;

	const [actualInterval, setActualInterval] = useState(TIME_INTERVAL_HOURS);
	const handleChangeActualInterval = (value) => {
		setActualInterval(value);
	};

	let mounted = false;
	const [weatherData, setWeatherData] = useBrowserStorage('previousAPIdata', [], 'session');
	useEffect(() => {
		if (!mounted) {
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
			mounted = true;
		}
	});

	return (
		<Screen>
			{weatherData.length !== 0 && (
				<WeatherBackground weatherData={weatherData[actualInterval]}>
					<DataText size={3.5}>{weatherData[actualInterval].temperature}°</DataText>
					<WeatherImage weatherData={weatherData[actualInterval]} />
					<DataText size={2}>{weatherData[actualInterval].local.time}</DataText>
					<DataText size={1.25}>{weatherData[actualInterval].local.date}</DataText>
					<TimeSlider
						timeInterval={TIME_INTERVAL_HOURS}
						actualInterval={actualInterval}
						handleChangeActualInterval={handleChangeActualInterval}
					/>
					<DataText size={1}>{weatherData[actualInterval].local.city}</DataText>
					<DataText size={1}>
						{weatherData[actualInterval].local.state} - {weatherData[actualInterval].local.country}
					</DataText>
				</WeatherBackground>
			)}
		</Screen>
	);
}

export default WeatherDisplay;
