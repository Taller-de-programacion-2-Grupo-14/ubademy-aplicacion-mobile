export function desinscripcionCurso(curso) {

	return fetch(`${global.host}/desinscripcionCurso`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'curso': curso })
	});
}
