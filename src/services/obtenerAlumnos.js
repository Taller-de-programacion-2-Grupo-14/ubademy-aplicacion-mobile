export function obtenerAlumnos(cursoElegido) {

	return fetch(`${global.host}/obtenerAlumnos?id_course=${cursoElegido}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
	});
}
