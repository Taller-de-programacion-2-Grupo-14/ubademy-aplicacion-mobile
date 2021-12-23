import * as SecureStore from 'expo-secure-store';

export async function aceptarColaboracion(id) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/courses/collaborators`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'x-access-token': token
		},
		body: JSON.stringify({ 'id': id })
	});
}
