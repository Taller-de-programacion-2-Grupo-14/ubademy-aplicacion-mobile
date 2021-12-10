import * as SecureStore from 'expo-secure-store';

export async function misColaboraciones() {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/courses/my_collaborations`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
