import * as SecureStore from 'expo-secure-store';

export async function historialDeCursos() {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/courses/historial`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
