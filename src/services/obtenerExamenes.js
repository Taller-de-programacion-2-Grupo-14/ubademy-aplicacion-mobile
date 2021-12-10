import * as SecureStore from 'expo-secure-store';

export async function obtenerExamenes(idCurso, nombreExamen) {
	const token = await SecureStore.getItemAsync('secure_token');
	var aEnviar;

	if (nombreExamen == '') {
		aEnviar = `${global.host}/exams/${idCurso}`;
	} else {
		aEnviar = `${global.host}/exams/${idCurso}?name=${nombreExamen}`;
	}

	return fetch(`${aEnviar}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		},
	});
}
