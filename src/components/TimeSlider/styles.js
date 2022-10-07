import styled from 'styled-components';

const thumbStyle = `
	-webkit-appearance: none;
	height: 1.25rem;
	width: 1.25rem;
	background: #ffffff;
	cursor: ew-resize;
	border-radius: 25%;
	border: none;
	box-shadow: 0 0 1rem #ffffffaa;
`;

const CustomSlider = styled.input.attrs({
	type: 'range',
})`
	-webkit-appearance: none;
	width: 60%;
	max-width: 15rem;
	height: 0.5rem;
	background: rgba(225, 225, 225, 0.6);
	border-radius: 0.25rem;

	::-webkit-slider-thumb {
		${thumbStyle}
	}

	::-moz-range-thumb {
		${thumbStyle}
	}

	::-ms-thumb {
		${thumbStyle}
	}
`;

export default CustomSlider;
