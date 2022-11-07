import WeatherDisplay from './pages/WeatherDisplay';
import useBrowserStorage from './hooks/useBrowserStorage';

function App() {
	const [userOptions, setUserOptions] = useBrowserStorage(
		'userOptions',
		{
			local: {
				status: 'waiting',
				coords: [],
				address: {
					city: '',
					state_province_area: '',
					country: '',
				},
			},
			units: 'metric',
			timeInterval: 6,
		},
		'session'
	);

	const handleChangeUserOptions = (newOptions) => {
		const aux = { ...newOptions };
		setUserOptions(aux);
	};

	return (
		<WeatherDisplay
			userOptions={userOptions}
			handleChangeUserOptions={handleChangeUserOptions}
		/>
	);
}

export default App;
