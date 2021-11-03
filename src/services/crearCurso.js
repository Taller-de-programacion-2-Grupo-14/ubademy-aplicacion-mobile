export function crearCurso(titulo, descripcion, hashtags, tipo, examenes, suscripcion, location) {

	return fetch(`${global.host}/crearCurso`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'titulo': titulo, 'descripcion': descripcion, 'hashtags': hashtags, 'tipo': tipo, 'examenes': examenes, 'suscripcion': suscripcion, 'location': location })
	});
}
