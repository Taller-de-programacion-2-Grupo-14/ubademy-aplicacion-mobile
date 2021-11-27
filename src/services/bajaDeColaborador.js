import * as SecureStore from 'expo-secure-store';

export async function bajaDeColaborador(idCurso, idColaborador) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/courses/collaborators`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'id': idCurso, 'user_to_remove': idColaborador })
	});
}
