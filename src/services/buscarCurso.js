export function buscarCurso(busqueda) {

	return fetch(`${global.host}/buscarCurso`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'busqueda': busqueda })
	});
}
