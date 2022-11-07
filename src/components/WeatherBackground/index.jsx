import MainBackground from './styles';

function WeatherBackground({ weatherData, children }) {
	return (
		<MainBackground
			brightness={weatherData ? weatherData.background.brightness : 50}
			grayscale={weatherData ? weatherData.background.grayscale : 0}
		>
			{children}
		</MainBackground>
	);
}

export default WeatherBackground;
