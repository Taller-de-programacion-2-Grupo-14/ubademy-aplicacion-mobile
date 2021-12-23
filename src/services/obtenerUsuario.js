import * as SecureStore from 'expo-secure-store';

export async function obtenerUsuario() {
	const token = await SecureStore.getItemAsync('secure_token');
	console.log('en obtener usuario service');
	//cambiar la url por la de heroku cuando el mirage este desactivado
	return fetch(`${global.host}/users`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}

export async function obtenerUsuarios(blocked, email) {
	console.log('en obtener usuarios', email);
	const token = await SecureStore.getItemAsync('secure_token');
	console.log('en obtener usuarios service');
	//cambiar la url por la de heroku cuando el mirage este desactivado
	return fetch(`${global.host}/users/all?blocked=${blocked}&limit=10&not_email=${email}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}

export async function obtenerUsuarioConEmail(email) {
	console.log('en obtener usuario con email', email);
	return fetch(`${global.host}/users?email=${email}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json'
		},
	});
}

