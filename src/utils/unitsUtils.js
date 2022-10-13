export const fixDecimal = (value, decimals) => value.toFixed(decimals);

export const Fahrenheit = (celsius) => fixDecimal(parseInt(celsius, 10) * 1.8 + 32, 1);

export const MilesPerHour = (meterPerSec) => Math.round(meterPerSec * 2.236936 * 100) / 100;
