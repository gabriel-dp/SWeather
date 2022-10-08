const fixDecimal = (value, decimals) => value.toFixed(decimals);

const grayscaleFormula = (cloudCover) =>
	cloudCover < 1 ? 0 : Math.round((20 / Math.log(10) ** 2) * Math.log(cloudCover) ** 2);

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

const fixRawData = (rawData) => {
	const tempData = [];
	rawData.forEach((interval) => {
		const tempObject = { ...interval.values };
		Object.assign(tempObject, { time: interval.startTime });
		tempData.push(tempObject);
	});
	return tempData;
};

const handleInterval = (weatherData) => {
	// converts all times in milliseconds to use in operations
	const time = new Date(weatherData.time).getTime();
	const sunriseTime = new Date(weatherData.sunriseTime).getTime();
	const sunsetTime = new Date(weatherData.sunsetTime).getTime();

	const intervalHandledData = {
		time: weatherData.time,
		isDay: time > sunriseTime && time < sunsetTime,
		temperature: fixDecimal(weatherData.temperature, 1),
		humidity: weatherData.humidity,
		cloudCover: weatherData.cloudCover,
		windSpeed: weatherData.windSpeed,

		precipitation: {
			state: weatherData.precipitationType !== 0,
			rain: weatherData.rainIntensity,
			snow: weatherData.snowIntensity,
			freezingRain: weatherData.freezingRainIntensity,
		},
		background: {
			brightness: brightnessFormula(time, sunriseTime, sunsetTime),
			grayscale: grayscaleFormula(weatherData.cloudCover),
		},
		place: {
			city: 'São João del Rei',
			state: 'Minas Gerais',
			country: 'Brazil',
		},
	};
	return intervalHandledData;
};

function handleWeatherData(rawData) {
	const handledData = [];
	fixRawData(rawData).forEach((interval) => {
		handledData.push(handleInterval(interval));
	});
	return handledData;
}

export default handleWeatherData;
