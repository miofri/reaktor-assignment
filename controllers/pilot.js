/**
 * Routers
 *
 * pilotRouter.get(/home) =>
 * 		axios calls /home; dataParser gets the XML data from Reaktor's
 * 		site & convert it into JSON, filters the NDZ violators.
 * 		Waits for pilotData & droneData to be saved into MongoDB & send out
 * 		all saved Pilots.
 *
 * pilotRouter.get(/devicedetail) =>
 * 		sends the device data for (GUARDB1RD) & closest distance detected when called.
 */

const pilotRouter = require('express').Router()
const Pilot = require('../models/pilotNames');
const pilotLib = require('../functions/pilotLib')

pilotRouter.get('/home', (request, response, next) => {
	pilotLib.dataParser()
		.then(() => {
			return pilotLib.pilotData();
		})
		.then(() => {
			return pilotLib.droneData();
		})
		.then(() => {
			return Pilot.find({})
		})
		.then((result) => {
			response.send(result)
		})
		.catch(err => { next(err) })
})

pilotRouter.get('/devicedetail', (request, response) => {
	pilotLib.deviceData()
		.then((result) => {
			return response.send(result)
		})
})

const errorHandler = (error, request, response, next) => {
	console.log(error)
	next(error);
}

pilotRouter.use(errorHandler);

module.exports = pilotRouter
