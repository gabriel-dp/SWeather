import Cloud from './Elements/Cloud';
import Sun from './Elements/Sun';
import Moon from './Elements/Moon';

import { ImageContainer, CloudContainer, SunOrMoonContainer } from './styles';
import Wind from './Elements/Wind';

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

	const windDuration = weatherData.windSpeed < 5 ? 0 : 12 / weatherData.windSpeed;
	const windWidth = Math.min(Math.max(25, weatherData.windSpeed * 15), 65);

	return (
		<ImageContainer>
			<CloudContainer cloudSize={cloudSize}>
				<Cloud />
			</CloudContainer>
			<SunOrMoonContainer sunSize={sunSize}>
				{weatherData.isDay ? <Sun /> : <Moon />}
			</SunOrMoonContainer>
			<Wind
				windDuration={windDuration}
				windWidth={windWidth}
				bottom={13}
			/>
			<Wind
				windDuration={windDuration}
				windWidth={windWidth}
				bottom={8}
			/>
		</ImageContainer>
	);
}

export default WeatherImage;
