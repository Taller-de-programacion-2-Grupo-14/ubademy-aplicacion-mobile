import * as SecureStore from 'expo-secure-store';

export async function obtenerExamenes(idCurso) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/exams/${idCurso}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
