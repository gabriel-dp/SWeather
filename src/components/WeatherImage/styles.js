import styled from 'styled-components';

export const ImageContainer = styled.div`
	width: 80%;
	max-width: 15rem;
	aspect-ratio: 1;
	position: relative;
	margin: 1rem 0;
`;

export const CloudContainer = styled.div`
	width: ${(props) => props.cloudSize}%;
	transition: all ease 0.5s;
	z-index: 3;

	position: absolute;
	right: 0;
	bottom: 0;
`;

export const SunOrMoonContainer = styled.div`
	width: ${(props) => props.sunSize}%;
	transition: all ease 0.5s;
	z-index: 1;

	position: absolute;
	left: 0;
	bottom: ${(props) => (40 * (100 - props.sunSize)) / 100}%;
`;
