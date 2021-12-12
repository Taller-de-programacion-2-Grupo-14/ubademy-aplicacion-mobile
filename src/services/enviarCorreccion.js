import * as SecureStore from 'expo-secure-store';

export async function enviarCorreccion(idExamen, nota, observaciones) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/exams/correct/${idExamen}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'observaciones': observaciones, 'nota': nota })
	});
}
