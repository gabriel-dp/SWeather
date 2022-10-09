import { WindWrapper, WindLine } from './styles';

function Wind({ windSpeed }) {
	const windDuration = windSpeed < 5 ? 0 : 12 / windSpeed;
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
