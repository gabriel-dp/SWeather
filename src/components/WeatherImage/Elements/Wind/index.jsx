import { WindContainer, WindLine } from './styles';

function Wind({ windDuration, windWidth }) {
	return (
		<WindContainer windWidth={windWidth}>
			<WindLine windDuration={windDuration} />;
		</WindContainer>
	);
}

export default Wind;
