import * as SecureStore from 'expo-secure-store';

export async function desinscripcionCurso(id) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/courses/subscription/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
