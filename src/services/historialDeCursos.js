import * as SecureStore from 'expo-secure-store';

export async function historialDeCursos(estado) {
	const token = await SecureStore.getItemAsync('secure_token');
	var aEnviar = `${global.host}/courses/historical`;

	if (estado != 'Todos') {
		aEnviar = `${global.host}/courses/historical?status=${estado}`;
	}

	return fetch(`${aEnviar}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
