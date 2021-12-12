import * as SecureStore from 'expo-secure-store';

export async function enviarCorreccion(idExamen, idEstudiante, idCurso, nota, observaciones) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/resolution/grade`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'id_course': idCurso, 'id_exam': idExamen, 'id_student': idEstudiante, 'corrections': observaciones, 'status': nota })
	});
}
