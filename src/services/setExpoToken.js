import * as SecureStore from 'expo-secure-store';

export async function setUserExpoToken(expoToken) {
	console.log('en expo token', expoToken);
	const token = await SecureStore.getItemAsync('secure_token');
	//cambiar la url por la de heroku cuando el mirage este desactivado
	return fetch(`${global.host}/users/set-token`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'x-access-token': token
		},
		body: JSON.stringify({ 'token': expoToken })
	});
}