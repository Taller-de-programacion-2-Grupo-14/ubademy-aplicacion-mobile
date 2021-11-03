export function password(mail) {
	return fetch(`${global.host}/password?email=${mail}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
	});
}
