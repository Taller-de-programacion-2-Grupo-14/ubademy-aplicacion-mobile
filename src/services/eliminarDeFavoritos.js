import * as SecureStore from 'expo-secure-store';

export async function eliminarDeFavoritos(idCurso) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/courses/favorites/remove`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'id': idCurso })
	});
}
