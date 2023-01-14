const express = require('express');
const app = express();
const cors = require('cors');
const { request, response } = require('express');
const axios = require('axios');
const { parseStringPromise } = require('xml2js');
const mongoose = require('mongoose');
const Pilot = require('./models/drones');
const fs = require('fs');

require('dotenv').config()

app.use(cors());
app.use(express.json());
// app.use(express.static('build'))

mongoose.connect(process.env.URL)
	.then(() => { return console.log('Connected to MongoDB') })

let closestDistance
let xmlParsedData;
let filteredResult;

fs.readFile('./confirmed_closest_distance.txt', 'utf8', (err, data) => {
	closestDistance = parseFloat(data);
	if (err) {
		console.error(err);
		return;
	}
})

const calculator = (x, y) => {
	const simplifyCoordinate = Math.pow((x / 1000 - 250), 2) + Math.pow(((y / 1000 - 250)), 2);
	const calculation = Math.sqrt(simplifyCoordinate);

	if (closestDistance > calculation) {
		closestDistance = calculation;

		fs.writeFile('./confirmed_closest_distance.txt', closestDistance.toString(), err => {
			if (err) {
				console.error(err);
			}
		});
	}
	if (calculation < 100)
		return true;
	else
		return false;
}

const nameChecker = async (pilotId) => {
	const currentDB = await Pilot.find({})

	let existingPilotId = currentDB.map(data => data.pilotId)

	if (existingPilotId.includes(pilotId))
		return true;
	else
		return false;
}

const pilotData = async () => {
	let serialNumbers = filteredResult.map(data => data.serialNumber)

	if (serialNumbers) {
		await Promise.all(serialNumbers.map(async (data) => {

			const pilotData = await axios.get(`https://assignments.reaktor.com/birdnest/pilots/${data}`)
			const doesPilotIdExist = await nameChecker(pilotData.data.pilotId);

			if (doesPilotIdExist === false) {

				const newPilot = new Pilot({
					pilotId: pilotData.data.pilotId,
					firstName: pilotData.data.firstName,
					lastName: pilotData.data.lastName,
					email: pilotData.data.email,
					phoneNumber: pilotData.data.phoneNumber
				})

				return newPilot.save();
			}
		}))
	}
}


const res = async () => {

	const droneCall = await axios.get('http://assignments.reaktor.com/birdnest/drones'
	)
	await parseStringPromise(droneCall.data).then(function (result) {
		xmlParsedData = result
	})

	let droneList = xmlParsedData.report.capture[0].drone.map(data => data) //filtering just the drone data...

	filteredResult = droneList.filter(data => calculator(data.positionX, data.positionY)); //...then filtering *within the NDZ*

	return filteredResult
}

app.get('/home', (request, response, next) => {
	res()
		.then(() => {
			return pilotData();
		})
		.then(() => {
			return Pilot.find({})
		})
		.then((result) => {
			response.send(result)
		})
		.catch(err => { next(err) })
})

app.get('/devicedetail', (request, response, next) => {
	let appendedXMLData = [closestDistance.toFixed(3)]
	appendedXMLData.push(xmlParsedData);

	response.send(appendedXMLData);
})

const errorHandler = (error, request, response, next) => {
	console.log(error)

	next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);

// Finding if a point is inside a circle: https://math.stackexchange.com/questions/198764/how-to-know-if-a-point-is-inside-a-circle
