export function misCursos() {

	return fetch('http://10.0.2.2:8080/misCursos', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
	});
}
