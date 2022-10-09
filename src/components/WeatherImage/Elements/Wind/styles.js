import styled, { keyframes } from 'styled-components';

export const WindWrapper = styled.div`
	width: ${(props) => props.windWidth}%;
	height: 0.25rem;
	border-radius: 100%;
	overflow: hidden;

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

export const WindLine = styled.div.attrs((props) => ({
	style: { animationDelay: `${props.windDelay}s`, animationDuration: `${props.windDuration}s` },
}))`
	height: 100%;
	width: 100%;
	background: linear-gradient(to right, #ffffff00, #ddd, #ffffff00);
	opacity: 0.5;
	border-radius: 1rem;

	transform: translateX(100%);
	animation-name: ${WindLineAnimation};
	animation-iteration-count: infinite;
`;
