export function editarUsuario(firstName, lastName, location, intrests, email, photo_url) {
	//cambiar la url por la de heroku cuando el mirage este desactivado
	return fetch(`${global.host}/users`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'first_name': firstName, 'last_name': lastName, 'location': location, 'interest': intrests, 'email': email, 'photo_url': photo_url })
	});
}
