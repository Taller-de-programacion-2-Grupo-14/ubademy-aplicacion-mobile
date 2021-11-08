export function misCursosInscriptos() {

	return fetch(`${global.host}/misCursosInscriptos`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
	});
}
