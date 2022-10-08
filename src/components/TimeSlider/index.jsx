import CustomSlider from './styles';

function TimeSlider({ timeInterval, actualInterval, handleChangeActualInterval }) {
	return (
		<CustomSlider
			type="range"
			min={0}
			max={timeInterval * 2}
			value={actualInterval}
			step={1}
			onChange={(event) => handleChangeActualInterval(event.target.value)}
			aria-label="time-slider"
		/>
	);
}

export default TimeSlider;
