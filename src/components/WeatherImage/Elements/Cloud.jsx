import CloudSVG from '../../../assets/WeatherElements/cloud.svg';

function Cloud() {
	return (
		<img
			src={CloudSVG}
			style={{ width: '100%', aspectRatio: 1 }}
			alt="cloud"
		/>
	);
}

export default Cloud;
