import { useCallback, useState } from 'react';

function usePersistedState(key, initialValue) {
	const [state, setState] = useState(() => {
		try {
			const storedValue = sessionStorage.getItem(key);
			return storedValue ? JSON.parse(storedValue) : initialValue;
		} catch {
			return initialValue;
		}
	});

	const setValue = useCallback(
		(value) => {
			try {
				setState(value);
				sessionStorage.setItem(key, JSON.stringify(value));
			} catch (error) {
				console.error(error);
			}
		},
		[key]
	);

	return [state, setValue];
}

export default usePersistedState;
