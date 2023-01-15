const Pilot = require('../models/pilotNames');

const boolCalculator = (x, y) => {
	const simplifyCoordinate = Math.pow((x / 1000 - 250), 2) + Math.pow(((y / 1000 - 250)), 2);
	const calculation = Math.sqrt(simplifyCoordinate);

	if (calculation < 100)
		return true;
	else
		return false;
}

const calculator = (x, y) => {
	const simplifyCoordinate = Math.pow((x / 1000 - 250), 2) + Math.pow(((y / 1000 - 250)), 2);
	const calculation = Math.sqrt(simplifyCoordinate);

	return calculation;
}

const nameChecker = async (pilotId) => {
	const pilotDB = await Pilot.find({})

	let existingPilotId = pilotDB.map(data => data.pilotId)

	if (existingPilotId.includes(pilotId))
		return true;
	else
		return false;
}

module.exports = {
	boolCalculator, nameChecker, calculator
}
