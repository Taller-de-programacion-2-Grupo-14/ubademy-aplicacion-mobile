import * as SecureStore from 'expo-secure-store';

export async function obtenerCursos(tipo, suscripcion, textoLibre) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/courses?type=${tipo}&subscription=${suscripcion}&free_text=${textoLibre}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
