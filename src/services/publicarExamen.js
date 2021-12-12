import * as SecureStore from 'expo-secure-store';

export async function publicarExamen(idExamen) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/exams/publish`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'exam_id': idExamen })
	});
}
