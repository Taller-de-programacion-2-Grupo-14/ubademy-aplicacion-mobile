import * as SecureStore from 'expo-secure-store';

export async function editarExamen(idCurso, nombre, pregunta) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/exams/edit`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'id_course': idCurso, 'name': nombre, 'questions': pregunta })
	});
}
