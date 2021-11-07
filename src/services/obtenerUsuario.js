import * as SecureStore from 'expo-secure-store';

export async function obtenerUsuario() {
	const token = await SecureStore.getItemAsync('secure_token');
	//cambiar la url por la de heroku cuando el mirage este desactivado
	return fetch(`${global.host}/users`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
