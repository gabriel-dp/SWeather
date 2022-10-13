import WeatherDisplay from './pages/WeatherDisplay';
import useBrowserStorage from './hooks/useBrowserStorage';

function App() {
	const [userOptions, setUserOptions] = useBrowserStorage(
		'userOptions',
		{
			local: '',
			units: 'metric',
		},
		'local'
	);

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
