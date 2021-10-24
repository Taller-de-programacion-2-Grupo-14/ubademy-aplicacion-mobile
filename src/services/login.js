export function login(user, password) {
	//cambiar la url por la de heroku cuando el mirage este desactivado
	return fetch(`${global.host}/users/login`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'email': user, 'password': password })
	});
}
