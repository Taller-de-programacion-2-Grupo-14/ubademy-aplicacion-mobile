import * as SecureStore from 'expo-secure-store';

export async function historialDeCursos(estado) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/courses/historical?status=${estado}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
