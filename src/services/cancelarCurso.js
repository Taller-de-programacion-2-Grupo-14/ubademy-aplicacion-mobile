import * as SecureStore from 'expo-secure-store';

export async function cancelarCurso(id) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/courses/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			//'Content-Type': 'application/json'
		},
		//body: JSON.stringify({ 'curso': curso })
	});
}
