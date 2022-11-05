import styled from 'styled-components';

export const ImageContainer = styled.div`
	width: 30vh;
	max-width: 15rem;
	aspect-ratio: 0.85;
	position: relative;
	margin: 0.5rem 0;
	overflow: hidden;
	pointer-events: none;

	@media screen and (max-height: 525px) {
		display: none;
	}
`;

export const CloudContainer = styled.div`
	width: ${(props) => props.cloudSize}%;
	transition: all ease 0.5s;
	z-index: 3;

	position: absolute;
	right: 0;
	bottom: 15%;
`;

export const SunOrMoonContainer = styled.div`
	width: ${(props) => props.sunSize}%;
	transition: all ease 0.5s;
	z-index: 1;
	padding: 5%;

	position: absolute;
	left: 0;
	bottom: ${(props) => (40 * (100 - props.sunSize)) / 100 + 15}%;
`;

export const WindContainer = styled.div`
	width: 100%;
	height: 7%;
	position: absolute;
	bottom: 6%;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;
