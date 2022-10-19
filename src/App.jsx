import WeatherDisplay from './pages/WeatherDisplay';
import useBrowserStorage from './hooks/useBrowserStorage';
import getGeolocation from './utils/locationUtils';

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
		const aux = { newOptions };
		setUserOptions(aux);
	};

	getGeolocation(userOptions, handleChangeUserOptions);

	return (
		<div>
			{userOptions && userOptions.local.coords.length !== 0 && (
				<WeatherDisplay userOptions={userOptions} />
			)}
		</div>
	);
}

export default App;
