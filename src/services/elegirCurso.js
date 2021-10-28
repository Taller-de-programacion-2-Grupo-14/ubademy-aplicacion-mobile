export function elegirCurso(cursoElegido) {

	return fetch('http://10.0.2.2:8080/elegirCurso', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'cursoElegido': cursoElegido })
	});
}
