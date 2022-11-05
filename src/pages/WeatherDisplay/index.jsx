import { useEffect, useState } from 'react';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';

import useBrowserStorage from '../../hooks/useBrowserStorage';
import getRawData from '../../utils/weatherUtils/requestWeather';
import handleWeatherData from '../../utils/weatherUtils/handleWeatherData';
import { getTimeNow } from '../../utils/timeUtils';
import { DisplayTemperature, DisplaySpeed } from '../../utils/unitsUtils';

import WeatherBackground from '../../components/WeatherBackground';
import WeatherImage from '../../components/WeatherImage';
import TimeSlider from '../../components/TimeSlider';

import { Screen, DataText, DataIcon } from './styles';

function WeatherDisplay({ userOptions }) {
	const [actualInterval, setActualInterval] = useState(userOptions.timeInterval);
	const handleChangeActualInterval = (value) => {
		setActualInterval(value);
	};

	const [weatherData, setWeatherData] = useBrowserStorage('previousAPIdata', [], 'session');
	useEffect(() => {
		const previousDataIsValid =
			weatherData.length === userOptions.timeInterval * 2 + 1 &&
			getTimeNow().raw.getTime() <
				new Date(weatherData[userOptions.timeInterval].time).getTime() + 1000 * 60 * 60; // checks if data is more than 1 hour late
		if (!previousDataIsValid) {
			getRawData(userOptions.timeInterval).then((data) => {
				setWeatherData(handleWeatherData(data, userOptions));
				setActualInterval(userOptions.timeInterval);
			});
		}
	}, [weatherData, setWeatherData, userOptions, actualInterval]);

	const data = weatherData[actualInterval];

	return (
		<Screen>
			{weatherData.length !== 0 && (
				<WeatherBackground weatherData={data}>
					<DataText size={3.5}>{DisplayTemperature(data.temperature, userOptions.units)}</DataText>
					<WeatherImage weatherData={data} />
					<DataText size={2}>{data.local.time}</DataText>
					<DataText size={1.25}>{data.local.date}</DataText>
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
			)}
		</Screen>
	);
}

export default WeatherDisplay;
