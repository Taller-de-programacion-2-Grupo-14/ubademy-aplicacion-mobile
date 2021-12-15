import * as SecureStore from 'expo-secure-store';

export async function completarExamen(idCurso, preguntas, respuestas, nombreExamen) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/exams/resolve/${idCurso}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'name': nombreExamen , 'questions': preguntas, 'answers': respuestas })
	});
}
