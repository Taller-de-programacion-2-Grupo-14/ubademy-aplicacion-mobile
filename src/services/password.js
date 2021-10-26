export function password(mail) {
	return fetch(`http://10.0.2.2:8080/password?email=${mail}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
	});
}
