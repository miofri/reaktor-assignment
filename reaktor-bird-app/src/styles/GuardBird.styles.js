import styled from 'styled-components';

export const GuardBirdWrapper = styled.div`
	position: fixed;
	top: 280px;
	left: 120px;
	width: 400px;
	height: fit-content;

	@media(max-width: 1280px) {
		margin: auto;
		width: fit-content;
		position: static;
	}
`

export const GuardBirdDetailsWrapper = styled.div`
	margin: 0 auto auto 10px;
	width: fit-content;

	@media(max-width: 1280px) {
		font-size: ${props => props.body ? "20px" : "68px"};
		width: 97%
}

`

export const GuardBirdDetails = styled.div`
	font-family: ${props => props.body ? 'monospace' : '"Fugaz One", cursive'};
	font-size: ${props => props.body ? "20px" : "68px"};
	color: hsl(200 50% 90%);
	text-shadow: 0.1em 0.1em 0 hsl(200deg 50% 30%);

	@media(max-width: 1280px) {
		font-size: ${props => props.body ? "20px" : "70px"};
		width: 100%
	}
	@media(max-width: 480px) {
		font-size: ${props => props.body ? "16px" : "56px"};
	}
`

export const Credits = styled(GuardBirdDetails)`
	margin-top: 4px;
	width: 100%;
	text-align: center;
	font-size: 12px;
	@media(max-width: 1280px) {
		margin-left: 0;
		width: 100%;
		font-size: 10px;
		text-align: center;
}
`
