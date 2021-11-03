export function recuperoPassword(token, newPassword) {
	return fetch(`${global.host}/recuperoPassword`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'x-access-token': token
		},
		body: JSON.stringify({ 'newPassword': newPassword })
	});
}
