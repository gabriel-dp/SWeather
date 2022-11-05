import WeatherDisplay from './pages/WeatherDisplay';
import useBrowserStorage from './hooks/useBrowserStorage';

function App() {
	const [userOptions, setUserOptions] = useBrowserStorage('userOptions', {}, 'session');

	// sets default data for userOptions
	if (Object.keys(userOptions).length === 0) {
		setUserOptions({
			local: {
				coords: [-21, 44],
				address: {
					city: 'Resende Costa',
					state_province_area: 'Minas Gerais',
					country: 'Brazil',
				},
			},
			units: 'metric',
			timeInterval: 6,
		});
	}

	const handleChangeUserOptions = (options) => {
		setUserOptions(options);
	};

	return (
		<WeatherDisplay
			userOptions={userOptions}
			handleChangeUserOptions={handleChangeUserOptions}
		/>
	);
}

export default App;
