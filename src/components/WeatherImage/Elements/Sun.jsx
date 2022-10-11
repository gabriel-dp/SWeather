import SunSVG from '../../../assets/WeatherElements/sun.svg';

function Sun() {
	return (
		<img
			src={SunSVG}
			style={{ width: '100%', aspectRatio: 1 }}
			alt="sun"
		/>
	);
}

export default Sun;
