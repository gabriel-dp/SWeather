import units from '../data/units';

export const fixDecimal = (value, decimals) => value.toFixed(decimals);

export const DisplayTemperature = (celsius, system) => {
	const endString = units[system].temperature;
	if (system === 'metric') return celsius + endString;
	return fixDecimal(parseInt(celsius, 10) * 1.8 + 32, 1) + endString;
};

export const DisplaySpeed = (meterPerSec, system) => {
	const endString = units[system].speed;
	if (system === 'metric') return fixDecimal(meterPerSec, 1) + endString;
	return `${fixDecimal(Math.round(meterPerSec * 2.236936 * 100) / 100, 1)} ${endString}`;
};
