import { useState } from "react";
import { BigWrapper, MediumWrapper, PilotWrapper, SmallWrapper } from "../styles/PilotList.styles.";
import { expiryTime, readableTime } from "../utils/timeHelper";

export const DataHeader = () => {
	return (
		<PilotWrapper header>
			<MediumWrapper>Name</MediumWrapper>
			<BigWrapper>Email address</BigWrapper>
			<MediumWrapper>Contact number</MediumWrapper>
			<SmallWrapper>
				Spotted at
			</SmallWrapper>
		</PilotWrapper >
	)
}

export const DataList = ({ droneData }) => {
	const [showComponent, setShowComponent] = useState(true)
	let time = readableTime({ droneData })
	let timeUntilExpiry = expiryTime({ droneData })

	setTimeout(() => {
		setShowComponent(false)
	}, timeUntilExpiry);

	if (showComponent === true) {
		return (
			<PilotWrapper>
				<MediumWrapper>{droneData.lastName}, {droneData.firstName}</MediumWrapper>
				<BigWrapper>{droneData.email}</BigWrapper>
				<MediumWrapper>{droneData.phoneNumber}</MediumWrapper>
				<SmallWrapper>
					{time}
				</SmallWrapper>
			</PilotWrapper >
		)
	}
}
