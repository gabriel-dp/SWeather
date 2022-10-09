import styled, { keyframes } from 'styled-components';

export const PrecipitationContainer = styled.div`
	width: 60%;
	overflow: hidden;
	height: 60%;
	z-index: -1;

	display: ${(props) => (props.state ? 'flex' : 'none	')};
	flex-direction: row;
	justify-content: space-evenly;
	align-items: space-evenly;

	position: absolute;
	margin-left: auto;
	margin-right: auto;
	left: 0;
	right: 0;
	bottom: -30%;
	//background-color: blue;
`;

const PrecipitationAnimation = (translationX) => keyframes`
    0% {
        transform: translateY(-100%);
		scale: 1;
    }
	100% {
        transform: translate(${-translationX}%, 1000%);
		scale: 0.5;
    }
`;

export const ParticleContainer = styled.div.attrs((props) => ({
	style: { animationDelay: `${props.dropDelay}s` },
}))`
	width: 10%;
	min-width: 0.5rem;
	height: 1rem;
	transform: translateY(-100%);

	animation-name: ${(props) => PrecipitationAnimation(props.translationX)};
	animation-duration: 1s;
	animation-iteration-count: infinite;
`;
