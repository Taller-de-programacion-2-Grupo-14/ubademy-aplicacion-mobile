export function recuperoPassword(token, newPassword) {
	return fetch(`${global.host}/users/recreate-password`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'newPassword': newPassword })
	});
}
