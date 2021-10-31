export function obtenerCurso(cursoElegido) {

	return fetch('http://10.0.2.2:8080/obtenerCurso', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
	});
}
