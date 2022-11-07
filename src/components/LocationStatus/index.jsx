import { IoLocationSharp } from 'react-icons/io5';
import WeatherBackground from '../WeatherBackground';

import { LocationContainer, LoadingSymbol } from './styles';

function LocationStatus({ status }) {
	const message = 'Please, allow location access.';

	return (
		<WeatherBackground>
			<LocationContainer>
				{status === 'waiting' && (
					<>
						<span>
							<IoLocationSharp />
						</span>
						<p>{message}</p>
					</>
				)}
				{status === 'loading' && <LoadingSymbol />}
			</LocationContainer>
		</WeatherBackground>
	);
}

export default LocationStatus;
