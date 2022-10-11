import MoonSVG from '../../../assets/WeatherElements/moon.svg';

function Moon() {
	return (
		<img
			src={MoonSVG}
			style={{ width: '100%', aspectRatio: 1 }}
			alt="moon"
		/>
	);
}

export default Moon;
