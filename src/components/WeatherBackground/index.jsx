import MainBackground from './styles';

function WeatherBackground({ brightness = 50, grayscale = 0, children }) {
	return (
		<MainBackground
			brightness={brightness}
			grayscale={grayscale}
		>
			{children}
		</MainBackground>
	);
}

export default WeatherBackground;
