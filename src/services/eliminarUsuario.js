import * as SecureStore from 'expo-secure-store';

export async function eliminarUsuario() {
	const token = await SecureStore.getItemAsync('secure_token');
	return fetch('https://ubademy-14.herokuapp.com/users/delete-user', {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		}
	});
}