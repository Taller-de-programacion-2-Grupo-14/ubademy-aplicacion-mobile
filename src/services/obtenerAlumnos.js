import * as SecureStore from 'expo-secure-store';

export async function obtenerAlumnos(idCursoElegido, nombre, apellido, suscriptores) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/courses/users/${idCursoElegido}?first_name=${nombre}&last_name=${apellido}&subscribers=${suscriptores}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
