const express = require('express');
const app = express();
const nodemon = require('nodemon');
const cors = require('cors');
const { request, response } = require('express');
const axios = require('axios');
const { parseStringPromise } = require('xml2js');
var parseString = require('xml2js').parseString;

app.use(cors());
app.use(express.json());

let xmlParsedData;
let filteredResult;

const calculator = (x, y) => {

	// Finding if a point is inside a circle: https://math.stackexchange.com/questions/198764/how-to-know-if-a-point-is-inside-a-circle

	const simplifyCoordinate = Math.pow((x / 1000 - 250), 2) + Math.pow(((y / 1000 - 250)), 2);
	console.log('i am simplify', simplifyCoordinate, x, y);
	const calculation = Math.sqrt(simplifyCoordinate);
	console.log('i am calculation', calculation)

	if (calculation < 100)
		return true;
	else
		return false;
}

const res = async () => {
	await axios.get('http://assignments.reaktor.com/birdnest/drones', {
		params: {
			method: 'GET',
			headers: { "Access-Control-Allow-Origin": "*" },
		}
	})
		.then(async (response) => {
			await parseStringPromise(response.data).then(function (result) {
				// xmlParsedData = JSON.stringify(result, null, 2);
				xmlParsedData = result
			});
			return (xmlParsedData)
		})
		.then((xmlParsedData) => {
			filteredResult = xmlParsedData.report.capture[0].drone.map(data => data)
			filteredResult = filteredResult.filter(data => calculator(data.positionX, data.positionY));
			console.log('iamfilteredResult', filteredResult)
			return filteredResult
		})
		.catch(error => {
			console.log(error);
			response.status(500).end()
		})
};

app.get('/', (request, response) => {
	res()
		.then(() => {
			return response.send(filteredResult);
		})
	// console.log(JSON.stringify(xmlParsedData.report.capture, null, 2))
})

const PORT = 3001;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
