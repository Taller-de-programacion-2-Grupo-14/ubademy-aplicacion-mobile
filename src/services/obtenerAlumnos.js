export function obtenerAlumnos(cursoElegido, nombre, apellido) {

	return fetch(`${global.host}/obtenerAlumnos?id_course=${cursoElegido}&nombre=${nombre}&apellido=${apellido}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
	});
}
