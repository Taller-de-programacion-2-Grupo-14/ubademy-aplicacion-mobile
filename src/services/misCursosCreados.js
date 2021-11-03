export function misCursosCreados() {

	return fetch(`${global.host}/misCursosCreados`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
	});
}
