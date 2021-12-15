import * as SecureStore from 'expo-secure-store';

export async function enviarCorreccion(idEstudiante, idCurso, nota, observaciones, nombreExamen) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/resolution/grade`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'name': nombreExamen, 'id_course': idCurso, 'id_student': idEstudiante, 'corrections': observaciones, 'status': nota })
	});
}
