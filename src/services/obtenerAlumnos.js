import * as SecureStore from 'expo-secure-store';

export async function obtenerAlumnos(idCursoElegido, nombre, apellido, suscriptores) {
	const token = await SecureStore.getItemAsync('secure_token');
	var aEnviar = `${global.host}/courses/users/${idCursoElegido}?subscribers=${suscriptores}`;

	if (nombre != '') {
		aEnviar = aEnviar + `&first_name=${nombre}`;
	}

	if (apellido != '') {
		aEnviar = aEnviar + `&last_name=${apellido}`;
	}

	return fetch(`${aEnviar}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
