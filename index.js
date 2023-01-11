const express = require('express');
const app = express();
const cors = require('cors');
const { request, response } = require('express');
const axios = require('axios');
const { parseStringPromise } = require('xml2js');
const mongoose = require('mongoose');
const Pilot = require('./models/drones');
require('dotenv').config()

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URL)
	.then(() => { return console.log('Connected to MongoDB') })

let filteredResult;
let closestDistance = 101;

// Finding if a point is inside a circle: https://math.stackexchange.com/questions/198764/how-to-know-if-a-point-is-inside-a-circle
const calculator = (x, y) => {
	const simplifyCoordinate = Math.pow((x / 1000 - 250), 2) + Math.pow(((y / 1000 - 250)), 2);
	const calculation = Math.sqrt(simplifyCoordinate);

	console.log('i am simplify', simplifyCoordinate, x, y);
	console.log('i am calculation', calculation)

	if (closestDistance > calculation)
		closestDistance = calculation;
	if (calculation < 100)
		return true;
	else
		return false;
}

const nameChecker = async (pilotId) => {
	const currentDB = await Pilot.find({})
		.then(response => {
			return response
		})
	console.log('currenDB', currentDB)

	let existingPilotId = currentDB.map(data => data.pilotId)

	console.log('existing', existingPilotId)

	if (existingPilotId.includes(pilotId))
		return true;
	else
		return false;
}

const pilotData = async (req, res, next) => {
	let serialNumbers = filteredResult.map(data => data.serialNumber)

	if (serialNumbers) {
		await Promise.all(serialNumbers.map(async (data) => {
			await axios.get(`https://assignments.reaktor.com/birdnest/pilots/${data}`)
				.then(async (result) => {

					const doesPilotIdExist = await nameChecker(result.data.pilotId);

					if (doesPilotIdExist === false) {

						const newPilot = new Pilot({
							pilotId: result.data.pilotId,
							firstName: result.data.firstName,
							lastName: result.data.lastName,
							email: result.data.email,
							phoneNumber: result.data.phoneNumber
						})

						newPilot.save();

					}
				})
				.catch((err) => next(err));
		}
		))

	};
}

const res = async (request, response, next) => {
	let xmlParsedData;
	const droneCall = await axios.get('http://assignments.reaktor.com/birdnest/drones', {
		params: {
			method: 'GET',
			headers: { "Access-Control-Allow-Origin": "*" },
		}
	})
	await parseStringPromise(droneCall.data).then(function (result) {
		xmlParsedData = result
	})

	let filteredDrone = xmlParsedData.report.capture[0].drone.map(data => data) //filtering just the drone data...
	filteredResult = filteredDrone.filter(data => calculator(data.positionX, data.positionY)); //...then filtering *within the NDZ*
	console.log('iamfilteredResult', filteredResult)
	return filteredResult
}

app.get('/', (request, response, next) => {
	res()
		.then(() => {
			pilotData();
			return response.send(filteredResult);
		})
		.catch(err => next(err))
})

const PORT = 3001;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
