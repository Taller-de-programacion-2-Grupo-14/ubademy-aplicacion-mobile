export function buscarCurso(busqueda) {

	return fetch('http://10.0.2.2:8080/buscarCurso', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'busqueda': busqueda })
	});
}
