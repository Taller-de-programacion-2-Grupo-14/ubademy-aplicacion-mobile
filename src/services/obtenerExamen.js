import * as SecureStore from 'expo-secure-store';

export async function obtenerExamen(idCurso, nombreExamen) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/exam/${idCurso}/${nombreExamen}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
