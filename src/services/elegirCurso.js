import * as SecureStore from 'expo-secure-store';

export async function elegirCurso(id) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/courses/subscription/${id}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
