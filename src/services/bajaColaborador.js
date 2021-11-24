import * as SecureStore from 'expo-secure-store';

export async function bajaColaborador(id) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/courses/colaborador/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
