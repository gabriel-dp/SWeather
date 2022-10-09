import Cloud from './Elements/Cloud';
import Sun from './Elements/Sun';
import Moon from './Elements/Moon';
import Wind from './Elements/Wind';
import Precipitation from './Elements/Precipitation';

import { ImageContainer, CloudContainer, SunOrMoonContainer, WindContainer } from './styles';

function WeatherImage({ weatherData }) {
	let cloudSize;
	let sunSize;

	if (weatherData.cloudCover < 10) {
		sunSize = 100;
		cloudSize = 0;
	} else if (weatherData.cloudCover >= 80) {
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
				/>
			</CloudContainer>
			<SunOrMoonContainer sunSize={sunSize}>
				{weatherData.isDay ? <Sun /> : <Moon />}
			</SunOrMoonContainer>
			<WindContainer>
				<Wind windSpeed={weatherData.windSpeed} />
				<Wind windSpeed={weatherData.windSpeed} />
			</WindContainer>
		</ImageContainer>
	);
}

export default WeatherImage;
