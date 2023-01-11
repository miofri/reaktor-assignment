const res = async () => {
	const droneCall = await axios.get('http://assignments.reaktor.com/birdnest/drones', {
		params: {
			method: 'GET',
			headers: { "Access-Control-Allow-Origin": "*" },
		}
	})

	// console.log('dronecall.data', droneCall.data, typeof droneCall.data)

	await parseStringPromise(droneCall.data).then(function (result) {
		// xmlParsedData = JSON.stringify(result, null, 2);
		xmlParsedData = result
	})

	console.log('xmlPD', typeof xmlParsedData.report, JSON.stringify(xmlParsedData, null, 2))

	// let filteredDrone = xmlParsedData.report.capture[0].drone.map(data => data) //filtering just the drone data...
	// filteredResult = filteredDrone.filter(data => calculator(data.positionX, data.positionY)); //...then filtering *within the NDZ*
	// console.log('iamfilteredResult', filteredResult)
	return filteredResult
}

// const res = async () => {
// 	await axios.get('http://assignments.reaktor.com/birdnest/drones', {
// 		params: {
// 			method: 'GET',
// 			headers: { "Access-Control-Allow-Origin": "*" },
// 		}
// 	})
// 		.then(async (response) => {
// 			await parseStringPromise(response.data).then(function (result) {
// 				// xmlParsedData = JSON.stringify(result, null, 2);
// 				xmlParsedData = result
// 			});
// 			return (xmlParsedData)
// 		})
// 		.then((xmlParsedData) => {
// 			let filteredDrone = xmlParsedData.report.capture[0].drone.map(data => data) //filtering just the drone data...
// 			filteredResult = filteredDrone.filter(data => calculator(data.positionX, data.positionY)); //...then filtering *within the NDZ*
// 			console.log('iamfilteredResult', filteredResult)
// 			return filteredResult
// 		})
// 		.catch(error => {
// 			console.log(error);
// 			response.status(500).end()
// 		})
// };
