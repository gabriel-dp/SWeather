import { useCallback, useState } from 'react';

function useBrowserStorage(key, initialValue, mode) {
	const [state, setState] = useState(() => {
		try {
			const storedValue =
				mode === 'local' ? localStorage.getItem(key) : sessionStorage.getItem(key);
			return storedValue ? JSON.parse(storedValue) : initialValue;
		} catch {
			return initialValue;
		}
	});

	const setValue = useCallback(
		(value) => {
			try {
				setState(value);
				if (mode === 'local') localStorage.setItem(key, JSON.stringify(value));
				else sessionStorage.setItem(key, JSON.stringify(value));
			} catch (error) {
				console.error(error);
			}
		},
		[key]
	);

	return [state, setValue];
}

export default useBrowserStorage;
