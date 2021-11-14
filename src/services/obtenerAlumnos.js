export function obtenerAlumnos(idCursoElegido, nombre, apellido) {

	return fetch(`${global.host}/obtenerAlumnos?id_course=${idCursoElegido}&nombre=${nombre}&apellido=${apellido}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
	});
}
