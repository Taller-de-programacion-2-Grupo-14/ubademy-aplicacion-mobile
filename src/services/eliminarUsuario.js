import * as SecureStore from 'expo-secure-store';

export async function eliminarUsuario() {
	const token = await SecureStore.getItemAsync('secure_token');
	return fetch(`${global.host}/users/delete-user`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		}
	});
}