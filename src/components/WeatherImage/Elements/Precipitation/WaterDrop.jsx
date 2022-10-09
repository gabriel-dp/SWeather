import WaterDropSVG from '../../../../assets/waterdrop.svg';

function Cloud() {
	return (
		<img
			src={WaterDropSVG}
			style={{ width: '100%', aspectRatio: 0.75 }}
			alt="waterdrop"
		/>
	);
}

export default Cloud;
