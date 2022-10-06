import WeatherImage from '../WeatherImage';
import MainBackground from './styles';

const grayscaleFormula = (cloudCover) =>
	cloudCover < 1 ? 0 : (20 / Math.log(10) ** 2) * Math.log(cloudCover) ** 2;

const brightnessFormula = (time, sunriseTime, sunsetTime) => {
	if (time < sunriseTime || time > sunsetTime) return 15; // night

	const intervalRiseSet = (sunsetTime - sunriseTime) / 18; // the quotient defines the sunrise/sunset duration
	const sunriseMax = sunriseTime + intervalRiseSet; // sun completely rises
	const sunsetIMin = sunsetTime - intervalRiseSet; // sun completely sets

	if (time > sunriseMax && time < sunsetIMin) return 100; // day

	const dayORnightDiff = time < sunriseMax ? time - sunriseTime : sunsetTime - time; // diff from time and sunrise/sunset
	const brightnessPercentage = (85 * dayORnightDiff) / intervalRiseSet + 15; // calculates percentage based on the diff and the duration of sunrise/sunset
	return brightnessPercentage;
};

function WeatherBackground({ weatherData }) {
	// converts all times in milliseconds to use in operations
	const time = new Date(weatherData.time).getTime();
	const sunriseTime = new Date(weatherData.sunriseTime).getTime();
	const sunsetTime = new Date(weatherData.sunsetTime).getTime();

	const brightness = brightnessFormula(time, sunriseTime, sunsetTime);
	const grayscale = grayscaleFormula(weatherData.cloudCover);
	const isDay = time > sunriseTime && time < sunsetTime;

	return (
		<MainBackground
			brightness={brightness}
			grayscale={grayscale}
		>
			<WeatherImage
				isDay={isDay}
				cloudCover={weatherData.cloudCover}
			/>
		</MainBackground>
	);
}

export default WeatherBackground;
