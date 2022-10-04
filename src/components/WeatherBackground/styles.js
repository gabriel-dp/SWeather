import styled from 'styled-components';

const MainBackground = styled.div`
	width: 100%;
	height: 100vh;

	display: flex;
	justify-content: center;
	align-items: center;

	::before {
		content: '';
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 100%;
		transition: all ease 0.2s;

		background-color: #00abf0;
		filter: brightness(${(props) => props.brightness}%) grayscale(${(props) => props.grayscale}%);
	}
`;
export default MainBackground;
