import WeatherDisplay from './pages/WeatherDisplay';
import useBrowserStorage from './hooks/useBrowserStorage';

function App() {
	const [userOptions, setUserOptions] = useBrowserStorage(
		'userOptions',
		{
			local: {
				coords: [],
				address: {
					town: '',
					country: '',
				},
			},
			units: 'metric',
		},
		'session'
	);

	const handleChangeUserOptions = (newOptions) => {
		const aux = { ...newOptions };
		setUserOptions(aux);
	};

	return (
		<div>
			{userOptions && (
				<WeatherDisplay
					userOptions={userOptions}
					handleChangeUserOptions={handleChangeUserOptions}
				/>
			)}
		</div>
	);
}

export default App;
