import styled from 'styled-components';

export const ClosestDistanceWrapper = styled.div`
width: 384px;
height: 100px;
margin: 15px auto 15px 10px;
border-radius: 5px;
background-color: hsl(200 50% 90%);
box-shadow: 0.2em 0.1em 0 hsl(200deg 50% 30%);
text-align: center;

@media(max-width: 480px) {
	width: 308px;
	}
`
export const ClosestDistanceHeader = styled.div`
border-bottom: 10px;
border-style: solid;
border-color: black;

font-family: 'Fugaz One', cursive;
font-size: 15px;
text-align: center;
color: black;

width: 381px;
height: 27px;
background-color: hsl(200 50% 90%);
padding-top: 3px;

@media(max-width: 480px) {
	width: 304px;
	font-size: 12px;
	}
`
export const ClosestDistanceNumber = styled.div`
width: 384px;
padding-top: 10px;
font-size: 24px;
font-family: monospace;
text-align: center;
text-shadow: 0.1em 0.1em 3px hsl(200deg 30% 79%);

@media(max-width: 480px) {
	width: 308px;
	font-size: 20px;
	}
`
