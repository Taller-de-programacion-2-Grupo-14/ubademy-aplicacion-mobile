export function misCursosCreados() {

	return fetch('http://10.0.2.2:8080/misCursosCreados', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
	});
}
