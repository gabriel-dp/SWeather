import styled, { keyframes } from 'styled-components';
import { IoLocationSharp } from 'react-icons/io5';

export const LocationContainer = styled.div`
	color: #fff;
	font-size: 1.5rem;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
`;

export const LocationSymbol = styled(IoLocationSharp)`
	color: #fff;
	font-size: 5rem;
`;

export const LoadingAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(359deg);
    }
`;

export const LoadingSymbol = styled.div`
	height: 3.5rem;
	aspect-ratio: 1;

	display: flex;
	align-items: center;
	justify-content: center;

	::after {
		content: ' ';
		display: block;
		width: 100%;
		aspect-ratio: 1;
		border-radius: 50%;
		border: 6px solid #fff;
		border-color: #fff transparent #fff transparent;
		animation: ${LoadingAnimation} 1.2s linear infinite;
	}
`;
