import * as SecureStore from 'expo-secure-store';

export async function obtenerUsuario() {
	const token = await SecureStore.getItemAsync('secure_token');
	//cambiar la url por la de heroku cuando el mirage este desactivado
	return fetch('http://10.0.2.2:8080/obtenerUsuario', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'x-access-token': token
		},
	});
}
