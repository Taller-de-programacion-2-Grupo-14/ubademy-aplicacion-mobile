export function recuperoPassword(token, newPassword) {
	return fetch('http://10.0.2.2:8080/recuperoPassword', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'x-access-token': token
		},
		body: JSON.stringify({ 'newPassword': newPassword })
	});
}
