import { useState, useEffect } from 'react';

function useFetch(url, options = {}) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(url, options)
			.then(async (response) => {
				const json = await response.json();
				setData(json);
			})
			.catch((e) => {
				setError(e);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [url]);

	return { data, loading, error };
}

export default useFetch;
