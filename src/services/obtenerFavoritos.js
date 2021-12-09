import * as SecureStore from 'expo-secure-store';

export async function obtenerFavoritos(suscripcion) {
	const token = await SecureStore.getItemAsync('secure_token');
	var aEnviar = `${global.host}/courses/favorites`;

	if (suscripcion != 'Todos') {
		aEnviar = `${global.host}/courses/favorites?subscription=${suscripcion}`;
	}

	return fetch(`${aEnviar}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
