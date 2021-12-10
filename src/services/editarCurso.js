import * as SecureStore from 'expo-secure-store';

export async function editarCurso(id, titulo, descripcion, hashtags, location) {
	const token = await SecureStore.getItemAsync('secure_token');
	//cambiar la url por la de heroku cuando el mirage este desactivado
	return fetch(`${global.host}/courses/${id}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'name': titulo, 'description': descripcion, 'hashtags': hashtags, 'location': location })
	});
}
