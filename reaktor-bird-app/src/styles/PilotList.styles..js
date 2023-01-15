import styled, { css, keyframes } from 'styled-components';

const FadeIn = keyframes`
  0% {
	opacity: 0.3;
  }
  100% {
	opacity: 1;
  }
`

const BobbingAnimation = keyframes`
  0% {
	transform: translateY(0);
  }
  25% {
	transform: translateY(3px);
  }
  50% {
	transform: translateY(0);
  }
  75% {
	transform: translateY(3px);
  }
  100%{
	transform: translateY(0);

  }
`

export const LoadingScreen = styled.div`
	font-family: monospace;
	font-size: 100px;
	color: hsl(200 50% 90%);
	text-shadow: 0.1em 0.1em 0 hsl(200deg 50% 30%);
	width: fit-content;
	margin: 22% auto;

	animation: ${BobbingAnimation} 1s ease-in-out infinite;

	@media(max-width: 1280px) {
		font-size: 28px;
		margin: 25vw auto;
	}

`

export const TopWrapper = styled.div`
	animation:	${FadeIn} ease-in-out;
	animation-duration: 3s;
`

export const ListWrapper = styled.div`
	width: fit-content;
	margin: 25px 80px auto auto;

	@media(max-width: 1280px) {
		margin: 25px auto;
	}

	@media(max-width: 480px) {
		margin: 25px auto;
	}
`
/*
1200
1024
992
800
782
600
480

*/
export const PilotWrapper = styled.div`
	width: 900px;
	height: 30px;
	box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
	padding: 10px 20px;
	margin: 10px 30px;

	border-bottom: solid;
	border-width: 5px;
	border-radius: 15px;
	border-color: hsl(200deg 50% 30%);

	display: flex;
	flex-direction: row;
	justify-content: space-between;

	color:  #003d5c;
	background-color: hsl(200 50% 90%);
	font-weight: ${props => props.header ? "bold" : "none"};
	font-size: 15px;
	font-family: monospace;

	@media(max-width: 1280px) {
		margin: 10px auto;
	}

	@media(max-width: 992px) {
		width: 800px;
		font-size: 13px;
	}

	@media(max-width: 782px) {
		width: 700px;
		font-size: 13px;
	}

	@media(max-width: 600px) {
		width: 480px;
		font-size: 12px;
	}

	@media(max-width: 480px) {
		padding: 3px 10px;
		width: 380px;
		font-size: 10px;
		border-radius: 10px;
	}
`

export const SmallWrapper = styled.span`
	margin: auto;
	width: 90px;

	@media(max-width: 600px) {
		width: 60px;
	}

	@media(max-width: 480px) {
		width: 48px;
	}
`

export const MediumWrapper = styled.span`
	margin: auto;
	width: 200px;

	@media(max-width: 600px) {
		width: 120px;
	}

	@media(max-width: 480px) {
		width: 68px;
	}
`

export const BigWrapper = styled.span`
	margin: auto;
	width: 270px;

	@media(max-width: 600px) {
		width: 200px;
	}

	@media(max-width: 480px) {
		width: 160px;
	}
`
