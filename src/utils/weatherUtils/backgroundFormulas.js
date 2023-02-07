import { compareHoursMinutes, minutesFromTime } from '../timeUtils';

export const grayscaleFormula = (cloudCover) =>
	cloudCover < 1 ? 0 : Math.round((20 / Math.log(10) ** 2) * Math.log(cloudCover) ** 2);

export const brightnessFormula = (time, sunriseTime, sunsetTime) => {
	if (compareHoursMinutes(sunriseTime, time) || compareHoursMinutes(time, sunsetTime)) return 15; // night

	const getDayTime = (time) => minutesFromTime(time) * 60 * 1000;

	const fullTime = getDayTime(time);
	const sunriseDayTime = getDayTime(sunriseTime);
	const sunsetDayTime = getDayTime(sunsetTime);

	const intervalRiseSet = parseInt((sunsetDayTime - sunriseDayTime) / 18, 10); // the quotient defines the sunrise/sunset duration
	const sunriseMax = sunriseDayTime + intervalRiseSet; // sun completely rises
	const sunsetMin = sunsetDayTime - intervalRiseSet; // sun completely sets

	if (fullTime > sunriseMax && fullTime < sunsetMin) return 100; // day

	const dayORnightDiff =
		fullTime < sunriseMax ? fullTime - sunriseDayTime : sunsetDayTime - fullTime; // diff from time and sunrise/sunset
	const brightnessPercentage = (85 * dayORnightDiff) / intervalRiseSet + 15; // calculates percentage based on the diff and the duration of sunrise/sunset

	return brightnessPercentage;
};
