export function cancelarCurso(curso) {

	return fetch(`${global.host}/cancelarCurso`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'curso': curso })
	});
}
