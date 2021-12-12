import * as SecureStore from 'expo-secure-store';

export async function completarExamen(idExamen, preguntas, respuestas) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/exams/resolve/${idExamen}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'questions': preguntas, 'answers': respuestas })
	});
}
