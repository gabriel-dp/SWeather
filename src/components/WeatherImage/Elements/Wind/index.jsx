import keyValues from '../../../../data/keyValues';
import { WindWrapper, WindLine } from './styles';

function Wind({ windSpeed }) {
	const windDuration = windSpeed < keyValues.MIN_WIND_SPEED ? 0 : 12 / windSpeed;
	const windWidth = Math.min(Math.max(25, windSpeed * 15), 65);
	const randomDelay = Math.random() * 3 + 1;

	return (
		<WindWrapper windWidth={windWidth}>
			<WindLine
				windDuration={windDuration}
				windDelay={randomDelay}
			/>
		</WindWrapper>
	);
}

export default Wind;
