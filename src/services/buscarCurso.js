export function buscarCurso(tipo, suscripcion, textoLibre) {

	return fetch(`${global.host}/buscarCurso?tipo=${tipo}&suscripcion=${suscripcion}&textoLibre=${textoLibre}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'tipo': tipo, 'suscripcion': suscripcion, 'textoLibre': textoLibre })
	});
}
