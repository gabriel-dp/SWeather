import { WindContainer, WindLine } from './styles';

function Wind({ windDuration, windWidth, bottom }) {
	const randomDelay = Math.random() * 3 + 1;
	return (
		<WindContainer
			windWidth={windWidth}
			bottom={bottom}
		>
			<WindLine
				windDuration={windDuration}
				windDelay={randomDelay}
			/>
		</WindContainer>
	);
}

export default Wind;
