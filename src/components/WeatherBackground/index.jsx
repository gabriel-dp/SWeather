import MainBackground from './styles';

function WeatherBackground({ weatherData, children }) {
	return (
		<MainBackground
			brightness={weatherData.background.brightness}
			grayscale={weatherData.background.grayscale}
		>
			{children}
		</MainBackground>
	);
}

export default WeatherBackground;
