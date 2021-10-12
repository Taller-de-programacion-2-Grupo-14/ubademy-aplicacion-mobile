export function recuperoPassword(token, newPassword) {

	return fetch('http://10.0.2.2:8080/recuperoPassword', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'token': token, 'newPassword': newPassword })
	});
}
