import WaterDrop from './WaterDrop';
import { PrecipitationContainer, ParticleContainer } from './styles';

function Precipitation({ precipitationData, windSpeed, MAX_PARTICLES, MIN_WIND_SPEED }) {
	const particlesQuantity = Math.min(
		MAX_PARTICLES,
		Math.ceil(Math.sqrt(precipitationData.rain * 15))
	);
	const translationX =
		windSpeed < MIN_WIND_SPEED ? 0 : 1000 * Math.sin(Math.min(windSpeed, 20) / 25);
	return (
		<PrecipitationContainer state={precipitationData.state}>
			{Array(particlesQuantity)
				.fill()
				.map(() => {
					const randomDelay = Math.random();
					return (
						<ParticleContainer
							key={randomDelay}
							dropDelay={randomDelay}
							translationX={translationX}
						>
							<WaterDrop />
						</ParticleContainer>
					);
				})}
		</PrecipitationContainer>
	);
}

export default Precipitation;
