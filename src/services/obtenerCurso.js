export function obtenerCurso(cursoElegido) {

	return fetch(`${global.host}/obtenerCurso?id_course=${cursoElegido}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
	});
}
