export const readableTime = ({ droneData }) => {
	const initialMinute = (new Date(droneData.createdAt)).getMinutes()
	const editedMinute = initialMinute < 10 ? `0${initialMinute}` : initialMinute

	const initialSecond = (new Date(droneData.createdAt)).getSeconds()
	const editedSecond = initialSecond < 10 ? `0${initialSecond}` : initialSecond

	const time = `${(new Date(droneData.createdAt)).getHours()}:${editedMinute}:${editedSecond}`

	return time;
}

export const expiryTime = ({ droneData }) => {
	const createdAt = new Date(droneData.createdAt).getTime()
	const tenMinutesAfter = createdAt + 600000
	let timeUntilExpiry = (tenMinutesAfter - Date.now())

	console.log(droneData.firstName, timeUntilExpiry, droneData.createdAt)

	return timeUntilExpiry;
}
