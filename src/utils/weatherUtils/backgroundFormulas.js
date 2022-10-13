export const grayscaleFormula = (cloudCover) =>
	cloudCover < 1 ? 0 : Math.round((20 / Math.log(10) ** 2) * Math.log(cloudCover) ** 2);

export const brightnessFormula = (time, sunriseTime, sunsetTime) => {
	if (time < sunriseTime || time > sunsetTime) return 15; // night

	const intervalRiseSet = (sunsetTime - sunriseTime) / 18; // the quotient defines the sunrise/sunset duration
	const sunriseMax = sunriseTime + intervalRiseSet; // sun completely rises
	const sunsetIMin = sunsetTime - intervalRiseSet; // sun completely sets

	if (time > sunriseMax && time < sunsetIMin) return 100; // day

	const dayORnightDiff = time < sunriseMax ? time - sunriseTime : sunsetTime - time; // diff from time and sunrise/sunset
	const brightnessPercentage = (85 * dayORnightDiff) / intervalRiseSet + 15; // calculates percentage based on the diff and the duration of sunrise/sunset
	return brightnessPercentage;
};
