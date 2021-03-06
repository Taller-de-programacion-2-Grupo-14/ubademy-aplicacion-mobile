import * as SecureStore from 'expo-secure-store';

export async function examenesACorregir(idCurso, estado) {
	const token = await SecureStore.getItemAsync('secure_token');
	var aEnviar;

	if (estado == 'Todos') {
		aEnviar = `${global.host}/resolutions/${idCurso}`;
	} else {
		aEnviar = `${global.host}/resolutions/${idCurso}?status=${estado}`;
	}

	return fetch(`${aEnviar}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
