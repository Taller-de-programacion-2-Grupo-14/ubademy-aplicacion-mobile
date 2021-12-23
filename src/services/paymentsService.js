import * as SecureStore from 'expo-secure-store';

export async function changeSubscription(level) {
	console.log('en change subscriptionnnnnnnnnn');
	const token = await SecureStore.getItemAsync('secure_token');
	return fetch(`${global.host}/users/upgrade-subscription`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'x-access-token': token
		},
		body: JSON.stringify({ 'subscription': level })
	});
}