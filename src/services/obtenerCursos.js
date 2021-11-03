export function obtenerCursos() {

	return fetch(`${global.host}/obtenerCursos`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
	});
}
