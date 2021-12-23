import * as SecureStore from 'expo-secure-store';

export async function obtenerCursos(tipo, suscripcion, textoLibre) {
	const token = await SecureStore.getItemAsync('secure_token');
	var aEnviar = '';

	if (suscripcion == '') {
		aEnviar = `${global.host}/courses?type=${tipo}&free_text=${textoLibre}`;
	} else {
		aEnviar = `${global.host}/courses?type=${tipo}&subscription=${suscripcion}&free_text=${textoLibre}`;
	}

	return fetch(`${aEnviar}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}

export async function obtenerUltimosCursos(tipo, suscripcion, textoLibre) {
	const token = await SecureStore.getItemAsync('secure_token');
	var aEnviar = '';

	if (suscripcion == '') {
		aEnviar = `${global.host}/courses?type=${tipo}&free_text=${textoLibre}`;
	} else {
		aEnviar = `${global.host}/courses?type=${tipo}&subscription=${suscripcion}&free_text=${textoLibre}`;
	}

	return fetch(`${aEnviar}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
