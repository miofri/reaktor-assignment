import axios from "axios"
import { useState, useEffect } from "react";
import { devURL } from "../App";
import { ClosestDistanceWrapper, ClosestDistanceHeader, ClosestDistanceNumber } from '../styles/ClosestDistance.styles'
import { GuardBirdDetailsWrapper, GuardBirdDetails, GuardBirdWrapper, Credits } from "../styles/GuardBird.styles"
import { shortDateTime } from "../utils/timeHelper";

let closestDrone;

const ClosestDistanceBox = () => {

	return (
		<ClosestDistanceWrapper>
			<ClosestDistanceHeader>
				CLOSEST DISTANCE DETECTED WITHIN 10 MINS
			</ClosestDistanceHeader>
			<ClosestDistanceNumber>
				{closestDrone}m
			</ClosestDistanceNumber>
		</ClosestDistanceWrapper>
	)
}

const GuardBirdBox = ({ deviceData }) => {

	const upSince = shortDateTime(deviceData)

	return (
		<GuardBirdWrapper>
			<GuardBirdDetails>
				{deviceData.$.deviceId}
			</GuardBirdDetails>
			<GuardBirdDetailsWrapper>
				<GuardBirdDetails body>
					{'>'} Listen range: {parseFloat(deviceData.listenRange[0]) / 1000}m2
				</GuardBirdDetails>
				<GuardBirdDetails body>
					{'>'} Updates every {deviceData.updateIntervalMs[0]}ms
				</GuardBirdDetails>
				<GuardBirdDetails body>
					{'>'} Up since {upSince}
				</GuardBirdDetails>
			</GuardBirdDetailsWrapper>

			<ClosestDistanceBox />
			<Credits body> Birdnest NDZ violators - made by Selvi Kesuma</Credits>
		</GuardBirdWrapper>
	)
}

export const DeviceDetail = () => {
	const [deviceData, setDeviceData] = useState('')
	const [refresher, setRefresher] = useState(0)

	useEffect(() => {
		axios.get(`/devicedetail`)
			.then(async response => {
				closestDrone = response.data[0]
				if (response.data[1].report) {
					return setDeviceData(response.data[1].report.deviceInformation[0])
				}
				else {
					setTimeout(() => {
						setRefresher(prev => prev + 1)
					}, 1000);
				}
			})
			.catch(err => console.log(err))

		const interval = setInterval(() => {
			setRefresher(prev => prev + 1)
		}, 600000);

		return () => clearInterval(interval);
	}, [refresher])

	if (deviceData)
		return (
			<>
				<GuardBirdBox deviceData={deviceData} />
			</>
		)


}
