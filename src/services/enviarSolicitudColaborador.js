import * as SecureStore from 'expo-secure-store';

export async function enviarSolicitudColaborador(idCurso, mail) {
	const token = await SecureStore.getItemAsync('secure_token');

	return fetch(`${global.host}/courses/collaborators/send_request`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'id': idCurso, 'email_collaborator': mail })
	});
}
