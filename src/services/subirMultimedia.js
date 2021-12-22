import * as SecureStore from 'expo-secure-store';

export async function subirMultimedia(idCurso, titulo, imagenSubida) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/courses/multimedia/${idCurso}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'title': titulo, 'url': imagenSubida })
	});
}
