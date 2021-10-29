export function obtenerCursos() {

	return fetch('http://10.0.2.2:8080/obtenerCursos', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
	});
}
