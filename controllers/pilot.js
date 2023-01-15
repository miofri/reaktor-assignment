const pilotRouter = require('express').Router()
const Pilot = require('../models/pilotNames');
const pilotLib = require('../functions/pilotLib')

pilotRouter.get('/home', (request, response, next) => {
	pilotLib.res()
		.then(() => {
			return pilotLib.pilotData();
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
	appendedXMLData = pilotLib.deviceData();
	response.send(appendedXMLData);
})

const errorHandler = (error, request, response, next) => {
	console.log(error)
	next(error);
}

pilotRouter.use(errorHandler);

module.exports = pilotRouter
