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

async function getGeolocation(userOptions, handleChangeUserOptions) {
	if (!navigator.geolocation) {
		console.error('Geolocation is not supported by your browser');
		return;
	}

	function success(position) {
		const { latitude } = position.coords;
		const { longitude } = position.coords;
		requestReverseGeolocation(latitude, longitude).then((response) => {
			const data = {
				coords: [latitude, longitude],
				address: {
					town: response.data.name,
					stateProvinceArea: response.data.address.state,
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
