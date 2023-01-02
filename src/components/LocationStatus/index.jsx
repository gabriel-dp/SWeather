import WeatherBackground from '../WeatherBackground';

import { LocationContainer, LocationSymbol, LoadingSymbol } from './styles';

function WaitingUserLocation() {
	const message = 'Please, allow location access.';
	return (
		<LocationContainer>
			<LocationSymbol />
			<span>{message}</span>
		</LocationContainer>
	);
}

function LocationStatus({ status }) {
	const displayElement = status === 'waiting' ? <WaitingUserLocation /> : <LoadingSymbol />;

	return <WeatherBackground>{displayElement}</WeatherBackground>;
}

export default LocationStatus;
