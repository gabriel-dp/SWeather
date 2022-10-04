const convertDateToISO = (date) => `${date.toISOString().slice(0, 19)}Z`;

const getTimeNow = () => {
	const dateRaw = new Date();
	const dateNow = {
		raw: dateRaw,
		iso: convertDateToISO(dateRaw),
	};
	return dateNow;
};

const getISOIntervalFromNow = (variation) => {
	const now = getTimeNow().raw.getTime();
	const variationMilliseconds = variation * 60 * 60 * 1000;
	const interval = [
		convertDateToISO(new Date(now - variationMilliseconds)),
		convertDateToISO(new Date(now + variationMilliseconds)),
	];
	return interval;
};

export { convertDateToISO, getTimeNow, getISOIntervalFromNow };
