import styled from 'styled-components';

export const ImageContainer = styled.div`
	width: 65%;
	max-width: 13rem;
	aspect-ratio: 0.8;
	position: relative;
	margin: 0.5rem 0;
	overflow: hidden;
	//background-color: red;
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

	position: absolute;
	left: 0;
	bottom: ${(props) => (40 * (100 - props.sunSize)) / 100 + 15}%;
`;

export const WindContainer = styled.div`
	width: 100%;
	height: 7%;
	position: absolute;
	bottom: 8%;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;
