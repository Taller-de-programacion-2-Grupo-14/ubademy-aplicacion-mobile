export function obtenerCursos(tipo, suscripcion, textoLibre) {

	return fetch(`${global.host}/courses?type=${tipo}&subscription=${suscripcion}&name=${textoLibre}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json'
		},
	});
}
