import { useState, useEffect } from "react";
import axios from 'axios';
import { ListWrapper, LoadingScreen, TopWrapper } from './styles/PilotList.styles.';
import { DeviceDetail } from './components/deviceDetail';
import { DataHeader, DataList } from './components/DataList';

export let devURL = "http://localhost:8080"

function App() {

	const [droneData, setDroneData] = useState();
	const [time, setTime] = useState(0)

	useEffect(() => {
		axios.get(`${devURL}/home`)
			.then(res => {
				return setDroneData(res.data);
			})
			.catch(err => {
				if (err.response !== undefined || err.response.status === 429) {
					console.log('Error: ', err.message)
					setTimeout(() => {
						return;
					}, 5000);
				}
				else
					console.log('Error: ', err.message)
			})

		const interval = setInterval(() => {
			setTime(time => time + 1);
		}, 2000);

		return () => { clearInterval(interval) };
	}, [time])

	if (droneData !== undefined) {
		return (
			<TopWrapper>
				<DeviceDetail />
				<ListWrapper>
					<DataHeader></DataHeader>
					{droneData.map(data => <DataList key={data._id} droneData={data} />)}
				</ListWrapper>
			</TopWrapper>
		);
	}
	else {
		return (
			<LoadingScreen>Loading data...</LoadingScreen>
		)
	}
}

export default App;
