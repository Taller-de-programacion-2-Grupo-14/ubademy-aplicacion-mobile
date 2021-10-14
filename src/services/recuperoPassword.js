export function recuperoPassword(token, newPassword) {
	return fetch('https://ubademy-14.herokuapp.com/users/recreate-password', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'x-access-token': token
		},
		body: JSON.stringify({ 'newPassword': newPassword })
	});
}
