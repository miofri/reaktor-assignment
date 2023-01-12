import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import { EmailAndNumberWrapper, NameWrapper, PilotWrapper, TimeWrapper, TopWrapper } from './App-style';
import { expiryTime, readableTime } from './utils/timeHelper';

const DataList = ({ droneData }) => {
	const [showComponent, setShowComponent] = useState(true)
	let time = readableTime({ droneData })
	let timeUntilExpiry = expiryTime({ droneData })

	setTimeout(() => {
		setShowComponent(false)
	}, timeUntilExpiry);

	if (showComponent === true) {
		return (
			<PilotWrapper>
				<NameWrapper>{droneData.lastName}, {droneData.firstName}</NameWrapper>
				<EmailAndNumberWrapper>
					{droneData.email}</EmailAndNumberWrapper>
				<EmailAndNumberWrapper>{droneData.phoneNumber}</EmailAndNumberWrapper>
				<TimeWrapper>
					{time}
				</TimeWrapper>
			</PilotWrapper>
		)
	}
}

function App() {

	const [droneData, setDroneData] = useState();
	const [time, setTime] = useState(0)

	useEffect(() => {
		axios.get('http://localhost:3001/')
			.then(response => {
				return setDroneData(response.data);
			})
		const interval = setInterval(() => {
			setTime(time => time + 1);
		}, 2000);

		console.log('i am droneData', time, droneData);
		return () => { clearInterval(interval) };

	}, [time])

	if (droneData && droneData.length > 0) {
		return (
			<TopWrapper>
				{droneData.map(data => <DataList key={data._id} droneData={data} />)}
			</TopWrapper>
		);
	}
	else {
		return (<h1>Loading data...</h1>)
	}
}

export default App;
