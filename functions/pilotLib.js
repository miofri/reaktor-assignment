const Pilot = require('../models/pilotNames');
const Drone = require('../models/droneData');
const fs = require('fs');
const { parseStringPromise } = require('xml2js');
const axios = require('axios')

let closestDistance
let xmlParsedData;
let filteredResult;
let test = false;

fs.readFile('./functions/confirmed_closest_distance.txt', 'utf8', (err, data) => {

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

		fs.writeFile('./functions/confirmed_closest_distance.txt', closestDistance.toString(), err => {
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

const droneData = async () => {

	const droneDB = await Drone.find({})
	let existingDroneSN = droneDB.map(data => data.serialNumber)

	filteredResult.forEach(element => {
		if (!(existingDroneSN.includes(element.serialNumber[0]))) {
			const newDrone = new Drone({
				serialNumber: element.serialNumber[0],
				model: element.model[0],
				manufacturer: element.manufacturer[0],
				mac: element.mac[0],
				ipv4: element.ipv4[0],
				ipv6: element.ipv6[0],
				firmware: element.firmware[0],
				positionY: element.positionY[0],
				positionX: element.positionY[0],
				altitude: element.altitude[0],
			})
			console.log('newDrone', element.serialNumber[0], newDrone.serialNumber)

			return newDrone.save()
		}

	});

}

const nameChecker = async (pilotId) => {
	const pilotDB = await Pilot.find({})

	let existingPilotId = pilotDB.map(data => data.pilotId)

	if (existingPilotId.includes(pilotId))
		return true;
	else
		return false;
}

const pilotData = async () => {

	droneData();

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
				console.log('newPilot', newPilot.pilotId)

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
	console.log('filteredResult', filteredResult)

	return filteredResult
}

const deviceData = () => {
	let appendedXMLData = [closestDistance.toFixed(3)]
	appendedXMLData.push(xmlParsedData);
	return appendedXMLData
}

module.exports = {
	res,
	pilotData,
	deviceData,
}
