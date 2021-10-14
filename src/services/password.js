export function password(mail) {
	return fetch(`https://ubademy-14.herokuapp.com/users/send-email-reset-password?email=${mail}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
	});
}
