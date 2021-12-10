export function password(mail) {
	return fetch(`${global.host}/users/send-email-reset-password?email=${mail}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
		},
	});
}
