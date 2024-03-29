import { useEffect, useState } from 'react';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';

import useBrowserStorage from '../../hooks/useBrowserStorage';
import getRawData from '../../utils/weatherUtils/requestWeather';
import handleWeatherData from '../../utils/weatherUtils/handleWeatherData';
import { getTimeNow } from '../../utils/timeUtils';
import { DisplayTemperature, DisplaySpeed } from '../../utils/unitsUtils';
import getGeolocation from '../../utils/locationUtils';

import WeatherBackground from '../../components/WeatherBackground';
import WeatherImage from '../../components/WeatherImage';
import TimeSlider from '../../components/TimeSlider';
import LocationStatus from '../../components/LocationStatus';

import { Screen, DataText, DataIcon } from './styles';
import getSunTimes from '../../utils/weatherUtils/requestSunTimes';

function WeatherDisplay({ userOptions, handleChangeUserOptions }) {
	const [actualInterval, setActualInterval] = useState(userOptions.timeInterval);
	const handleChangeActualInterval = (value) => {
		setActualInterval(value);
	};

	const [weatherData, setWeatherData] = useBrowserStorage('previousAPIdata', [], 'session');

	// gets user location to request weather data
	useEffect(() => {
		if (weatherData.length === 0 && userOptions.local.status === 'waiting') {
			getGeolocation(userOptions, handleChangeUserOptions);
		}
	}, [userOptions, handleChangeUserOptions, weatherData]);

	// gets weather data only after have user location
	useEffect(() => {
		if (userOptions.local.status === 'finished') {
			const previousDataIsValid =
				weatherData.length === userOptions.timeInterval * 2 + 1 && // checks if previous data is valid and checks interval changes
				getTimeNow().raw.getTime() <
					new Date(weatherData[userOptions.timeInterval].time).getTime() + 1000 * 60 * 60; // checks if data is more than 1 hour late

			if (!previousDataIsValid) {
				getRawData(userOptions.timeInterval, userOptions.local.coords).then((data) => {
					getSunTimes(userOptions.timeInterval, userOptions.local.coords).then((sunTimes) => {
						setWeatherData(handleWeatherData(data, sunTimes, userOptions));
						setActualInterval(userOptions.timeInterval);
					});
				});
			}
		}
	}, [userOptions.local.address.city, userOptions, weatherData, setWeatherData, setActualInterval]);

	const data = weatherData[actualInterval];

	if (weatherData.length === 0) {
		return (
			<Screen>
				<LocationStatus status={userOptions.local.status} />
			</Screen>
		);
	}

	return (
		<Screen>
			<WeatherBackground
				brightness={data.background.brightness}
				grayscale={data.background.grayscale}
			>
				<DataText size={3}>{DisplayTemperature(data.temperature, userOptions.units)}</DataText>
				<WeatherImage weatherData={data} />
				<DataText size={2}>{data.local.time}</DataText>
				<DataText size={1.25}>
					<DataIcon size={1}>
						<WiStrongWind />
					</DataIcon>
					&nbsp;{DisplaySpeed(data.windSpeed, userOptions.units)}
					&nbsp;&nbsp;&nbsp;
					<DataIcon size={1}>
						<WiHumidity />
					</DataIcon>
					&nbsp;
					{data.humidity}%
				</DataText>
				<TimeSlider
					timeInterval={userOptions.timeInterval}
					actualInterval={actualInterval}
					handleChangeActualInterval={handleChangeActualInterval}
				/>
				<DataText size={1}>
					{data.local.city}
					<br />
					{data.local.state_province_area} - {data.local.country}
				</DataText>
			</WeatherBackground>
		</Screen>
	);
}

export default WeatherDisplay;
