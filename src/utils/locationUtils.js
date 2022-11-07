import axios from 'axios';

async function requestReverseGeolocation(latitude, longitude) {
	const promise = axios
		.get(
			`https://nominatim.openstreetmap.org/reverse.php?lat=${latitude}&lon=${longitude}&zoom=10&format=jsonv2`
		)
		.then((response) => response);
	const dataPromise = promise;

	return dataPromise;
}

function changeUserLocal(data, userOptions, handleChangeUserOptions) {
	const newOptions = userOptions;
	newOptions.local = data;
	handleChangeUserOptions(newOptions);
}

function changeStatus(userOptions, handleChangeUserOptions) {
	if (userOptions.local.status === 'waiting') {
		const newOptions = userOptions;
		newOptions.local.status = 'loading';
		handleChangeUserOptions(newOptions);
	}
}

async function getGeolocation(userOptions, handleChangeUserOptions) {
	if (!navigator.geolocation) {
		console.error('Geolocation is not supported by your browser');
		return;
	}

	function success(position) {
		changeStatus(userOptions, handleChangeUserOptions);
		const { latitude } = position.coords;
		const { longitude } = position.coords;
		requestReverseGeolocation(latitude, longitude).then((response) => {
			const data = {
				status: 'finished',
				coords: [latitude, longitude],
				address: {
					city: response.data.name,
					state_province_area: response.data.address.state,
					country: response.data.address.country,
				},
			};
			changeUserLocal(data, userOptions, handleChangeUserOptions);
		});
	}
	function error() {
		console.error('Unable to retrieve your location');
	}

	navigator.geolocation.getCurrentPosition(success, error);
}

export default getGeolocation;
