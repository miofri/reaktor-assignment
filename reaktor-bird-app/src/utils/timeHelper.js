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

	return timeUntilExpiry;
}

export const shortDateTime = (deviceData) => {
	const options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' };
	const deviceTime = (new Date(deviceData.deviceStarted))
	const GMT = deviceTime.toString().split(" ").slice(5, 6)
	let finalDate = `${deviceTime.toLocaleDateString('en-FI', options)} ${GMT}`

	return (finalDate)
}
