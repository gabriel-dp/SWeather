import { grayscaleFormula, brightnessFormula } from './backgroundFormulas';
import { fixDecimal } from '../unitsUtils';
import { compareHoursMinutes } from '../timeUtils';

const fixRawData = (rawData) => {
	const tempData = [];
	rawData.forEach((interval) => {
		const tempObject = { ...interval.values };
		Object.assign(tempObject, { time: interval.startTime });
		tempData.push(tempObject);
	});
	return tempData;
};

const handleInterval = (weatherData, sunTimes, userOptions) => {
	// converts all times in milliseconds to use in operations
	const { time } = weatherData;
	const { sunriseTime, sunsetTime } = sunTimes[0].values;

	const localData = new Date(weatherData.time);
	const localTime = localData.toLocaleString('en-US', {
		timeZone: 'America/Sao_Paulo',
		hour: 'numeric',
		minute: 'numeric',
		hour12: false,
	});

	const intervalHandledData = {
		time: weatherData.time,
		isDay: compareHoursMinutes(time, sunriseTime) && compareHoursMinutes(sunsetTime, time),
		temperature: fixDecimal(weatherData.temperature, 1),
		humidity: weatherData.humidity,
		cloudCover: weatherData.cloudCover,
		windSpeed: weatherData.windSpeed,

		precipitation: {
			state: weatherData.precipitationType !== 0,
			probability: weatherData.precipitationProbability,
			rain: weatherData.rainIntensity,
			snow: weatherData.snowIntensity,
			freezingRain: weatherData.freezingRainIntensity,
		},
		background: {
			brightness: brightnessFormula(time, sunriseTime, sunsetTime),
			grayscale: grayscaleFormula(weatherData.cloudCover),
		},
		local: {
			time: localTime,
			city: userOptions.local.address.city,
			state_province_area: userOptions.local.address.state_province_area,
			country: userOptions.local.address.country,
		},
	};

	return intervalHandledData;
};

function handleWeatherData(rawData, sunTimes, userOptions) {
	const handledData = [];
	fixRawData(rawData).forEach((interval) => {
		handledData.push(handleInterval(interval, sunTimes, userOptions));
	});
	return handledData;
}

export default handleWeatherData;
