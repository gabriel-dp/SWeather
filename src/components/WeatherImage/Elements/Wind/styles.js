import styled, { keyframes } from 'styled-components';

export const WindContainer = styled.div`
	width: ${(props) => props.windWidth}%;
	height: 0.25rem;
	border-radius: 100%;
	overflow: hidden;

	position: absolute;
	margin-left: auto;
	margin-right: auto;
	left: 0;
	right: 0;

	bottom: ${(props) => props.bottom}%;
	z-index: 4;
`;

const WindLineAnimation = keyframes`
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(-200%);
    }
    `;

export const WindLine = styled.div`
	height: 100%;
	width: 100%;
	background: linear-gradient(to right, #ffffff00, #ddd, #ffffff00);
	opacity: 0.5;
	border-radius: 1rem;

	transform: translateX(100%);
	animation-name: ${WindLineAnimation};
	animation-duration: ${(props) => props.windDuration}s;
	animation-iteration-count: infinite;
	animation-delay: ${(props) => props.windDelay}s;
`;
