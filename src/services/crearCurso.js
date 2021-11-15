import * as SecureStore from 'expo-secure-store';

export async function crearCurso(titulo, descripcion, hashtags, tipo, examenes, suscripcion, location) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/courses/create`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'course_name': titulo, 'course_description': descripcion, 'hashtags': hashtags, 'course_type': tipo, 'amount_exams': parseInt(examenes), 'subscription': suscripcion, 'location': location })
	});
}
