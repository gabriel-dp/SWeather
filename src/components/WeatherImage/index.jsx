import keyValues from '../../data/keyValues';

import Cloud from './Elements/Cloud';
import Sun from './Elements/Sun';
import Moon from './Elements/Moon';
import Wind from './Elements/Wind';
import Precipitation from './Elements/Precipitation';

import { ImageContainer, CloudContainer, SunOrMoonContainer, WindContainer } from './styles';

function WeatherImage({ weatherData }) {
	let cloudSize;
	let sunSize;

	if (weatherData.cloudCover < keyValues.MIN_CLOUDY) {
		sunSize = 100;
		cloudSize = 0;
	} else if (weatherData.cloudCover >= keyValues.MAX_CLOUDY) {
		sunSize = 0;
		cloudSize = 100;
	} else {
		cloudSize = Math.min(50 + weatherData.cloudCover * 0.625, 100);
		sunSize = Math.max(100 - weatherData.cloudCover * 0.5625, 55);
	}

	return (
		<ImageContainer>
			<CloudContainer cloudSize={cloudSize}>
				<Cloud />
				<Precipitation
					precipitationData={weatherData.precipitation}
					windSpeed={weatherData.windSpeed}
					MAX_PARTICLES={keyValues.MAX_PARTICLES}
					MIN_WIND_SPEED={keyValues.MIN_WIND_SPEED}
				/>
			</CloudContainer>
			<SunOrMoonContainer sunSize={sunSize}>
				{weatherData.isDay ? <Sun /> : <Moon />}
			</SunOrMoonContainer>
			<WindContainer>
				<Wind
					windSpeed={weatherData.windSpeed}
					MIN_WIND_SPEED={keyValues.MIN_WIND_SPEED}
				/>
				<Wind
					windSpeed={weatherData.windSpeed}
					MIN_WIND_SPEED={keyValues.MIN_WIND_SPEED}
				/>
			</WindContainer>
		</ImageContainer>
	);
}

export default WeatherImage;
