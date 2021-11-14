export function editarCurso(titulo, descripcion, hashtags, examenes, tipoDeCurso, location, suscripcion) {
	//cambiar la url por la de heroku cuando el mirage este desactivado
	return fetch(`${global.host}/editarCurso`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'course_name': titulo, 'course_description': descripcion, 'hashtags': hashtags, 'amount_exams': examenes, 'course_type': tipoDeCurso, 'location': location, 'subscription': suscripcion })
	});
}
