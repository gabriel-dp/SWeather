import MainBackground from './styles';

const grayscaleFormula = (cloudCover) =>
	cloudCover < 1 ? 0 : (20 / Math.log(10) ** 2) * Math.log(cloudCover) ** 2;

const brightnessFormula = (time, sunriseTime, sunsetTime) => {
	if (time < sunriseTime || time > sunsetTime) return 15; // night

	const timeDateTime = new Date(time).getTime();
	const sunriseDateTime = new Date(sunriseTime).getTime();
	const sunsetDateTime = new Date(sunsetTime).getTime();

	const intervalRiseSet = (sunsetDateTime - sunriseDateTime) / 18;
	const sunriseMax = sunriseDateTime + intervalRiseSet;
	const sunsetIMin = sunsetDateTime - intervalRiseSet;

	if (timeDateTime > sunriseMax && timeDateTime < sunsetIMin) return 100; // day

	const dayORnightDiff =
		timeDateTime < sunriseMax ? timeDateTime - sunriseDateTime : sunsetDateTime - timeDateTime;
	const brightnessPercentage = (85 * dayORnightDiff) / intervalRiseSet + 15;
	return brightnessPercentage;
};

function WeatherBackground({
	time = '2022-10-01T12:00:00Z',
	sunriseTime = '2022-10-01T05:00:00Z',
	sunsetTime = '2022-10-01T16:53:00Z',
	cloudCover = 0,
	children,
}) {
	const brightness = brightnessFormula(time, sunriseTime, sunsetTime);
	const grayscale = grayscaleFormula(cloudCover);

	return (
		<MainBackground
			brightness={brightness}
			grayscale={grayscale}
		>
			{children}
		</MainBackground>
	);
}

export default WeatherBackground;
