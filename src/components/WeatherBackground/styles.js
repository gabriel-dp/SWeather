import styled from 'styled-components';

const MainBackground = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	::before {
		content: '';
		position: absolute;
		z-index: -1;
		width: 100%;
		top: 0;
		bottom: 0;
		transition: all ease 0.5s;

		background-color: #00abf0;
		filter: brightness(${(props) => props.brightness}%) grayscale(${(props) => props.grayscale}%);
	}
`;
export default MainBackground;
