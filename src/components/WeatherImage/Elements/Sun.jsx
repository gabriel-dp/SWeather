import SunSVG from '../../../assets/sun.svg';

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
