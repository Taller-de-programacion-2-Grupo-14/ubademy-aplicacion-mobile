import * as SecureStore from 'expo-secure-store';

export async function crearExamen(idCurso, nombre, preguntas) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/exams/create`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'id_course': idCurso, 'name': nombre, 'questions': preguntas })
	});
}
