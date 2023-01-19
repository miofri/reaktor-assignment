const Pilot = require('../models/pilotNames');
const Drone = require('../models/droneData');
const { parseStringPromise } = require('xml2js');
const axios = require('axios')
const pilotLibUtils = require('../utils/pilotLib-utils')

let closestDistance
let xmlParsedData;
let filteredResult;

const closestDistanceChecker = async () => {
	const droneDB = await Drone.find({})
	let droneWithDistance = []
	let distances = []

	droneDB.forEach(element => {
		let calculation = pilotLibUtils.calculator(element.positionX, element.positionY);

		let newObj = { ...element, distance: calculation };

		distances.push(calculation);
		droneWithDistance.push(newObj);
	});

	closestDistance = Math.min(...distances);

	return closestDistance;
}

const droneData = async () => {

	const droneDB = await Drone.find({})
	let existingDroneSN = droneDB.map(data => data.serialNumber)

	if (filteredResult) {
		await Promise.all(filteredResult.map(element => {

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
					positionX: element.positionX[0],
					altitude: element.altitude[0],
				})
				return newDrone.save()
			}
		}))
	}
}

const pilotData = async () => {

	let serialNumbers = filteredResult.map(data => data.serialNumber)

	if (serialNumbers) {
		await Promise.all(serialNumbers.map(async (data) => {

			const pilotData = await axios.get(`https://assignments.reaktor.com/birdnest/pilots/${data}`)
			const doesPilotIdExist = await pilotLibUtils.nameChecker(pilotData.data.pilotId);

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


	const droneCall = await axios.get('http://assignments.reaktor.com/birdnest/drones')
	await parseStringPromise(droneCall.data).then(function (result) {
		xmlParsedData = result
	})

	let droneList = xmlParsedData.report.capture[0].drone.map(data => data) //filtering just the drone data...

	filteredResult = droneList.filter(data => pilotLibUtils.boolCalculator(data.positionX, data.positionY)); //...then filtering *within the NDZ*

	return filteredResult
}

const deviceData = async () => {
	closestDistance = await closestDistanceChecker();

	let appendedXMLData = [closestDistance.toFixed(3)]
	appendedXMLData.push(xmlParsedData);

	return appendedXMLData
}

module.exports = {
	res,
	pilotData,
	deviceData,
	droneData
}
