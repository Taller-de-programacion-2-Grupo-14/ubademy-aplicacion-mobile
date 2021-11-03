export function elegirCurso(cursoElegido) {

	return fetch(`${global.host}/elegirCurso`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'cursoElegido': cursoElegido })
	});
}
