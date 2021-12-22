import * as SecureStore from 'expo-secure-store';

export async function crearCurso(titulo, descripcion, hashtags, tipo, examenes, suscripcion, location, imagenSubida) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/courses/create`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'name': titulo, 'description': descripcion, 'hashtags': hashtags, 'type': tipo, 'exams': parseInt(examenes), 'subscription': suscripcion, 'location': location, 'banner': imagenSubida })
	});
}
