import WaterDrop from './WaterDrop';
import { PrecipitationContainer, ParticleContainer } from './styles';

function Precipitation({ precipitationData, windSpeed }) {
	const particlesQuantity = Math.min(25, Math.ceil(Math.sqrt(precipitationData.rain * 15)));
	const translationX = windSpeed < 5 ? 0 : 1000 * Math.sin(Math.min(windSpeed, 20) / 25);
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
