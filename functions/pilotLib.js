/**
 * pilotLib - functions related to fetching & parsing data, and sending them out.
 *
 * Global var
 * 	closestDistance: the closest NDZ violator to the origin - type numbers
 * 	filteredResult: contains the list of NDZ violators in JSON format - type array of objects
 * 	xmlParsedData: converted XMLdata from Reaktor's API into JSON format - type object
 *
 * Functions
 * 	dataParser
 *		fetch the XML data from Reaktor's API, parses it into JSON format and filters the
		non-violators out. Returns filteredResult
 * 	droneData
		first fetch all the existing drone in DB and makes sure that there is no duplicate,
		and creates new drone documents from the filteredResult.
 * 	pilotData
		first fetch all the existing pilots in DB and makes sure that there is no duplicate,
		fetch pilot data from the API, and creates new pilot documents from the filteredResult.
 * 	closestDistanceChecker
		checks the current closest distance from all existing drone in the DB.
		pilotLibUtils.calculator calculates the closest distance with the Euclidean formula.
		then we return ClosestDistance which contains the min of all distances.
 * 	deviceData
		returns the device's detail from the API.
		after getting the closest distance, returns the device detail by appending it to xmlParsedData.
 */

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
	let distances = []

	droneDB.forEach(element => {
		let calculation = pilotLibUtils.calculator(element.positionX, element.positionY);
		distances.push(calculation);
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


const dataParser = async () => {
	const droneCall = await axios.get('http://assignments.reaktor.com/birdnest/drones'
	)
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
	dataParser,
	pilotData,
	deviceData,
	droneData
}
