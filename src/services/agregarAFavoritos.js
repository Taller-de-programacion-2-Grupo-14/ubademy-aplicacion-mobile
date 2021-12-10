import * as SecureStore from 'expo-secure-store';

export async function agregarAFavoritos(idCurso) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/courses/favorites`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'id': idCurso })
	});
}
