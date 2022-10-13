import styled from 'styled-components';

const MainBackground = styled.div`
	width: 100%;
	height: 100%;
	padding: 5rem 0;
	overflow: hidden;
	position: relative;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.25rem;

	::before {
		content: '';
		position: absolute;
		z-index: -1;
		width: 100%;
		top: 0;
		bottom: 0;
		transition: all ease 0.5s;

		background-color: #009bdc;
		filter: brightness(${(props) => props.brightness}%) grayscale(${(props) => props.grayscale}%);
	}
`;
export default MainBackground;
