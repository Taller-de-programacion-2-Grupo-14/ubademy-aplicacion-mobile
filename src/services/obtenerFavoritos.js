import * as SecureStore from 'expo-secure-store';

export async function obtenerFavoritos(suscripcion) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/favoritos?subscription=${suscripcion}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
