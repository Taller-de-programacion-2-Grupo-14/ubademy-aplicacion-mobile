export function userfirebaseLogin(fullName, email, photoURL) {
	return fetch(`${global.host}/users/login/firebase`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 'displayName': fullName, 'email': email, 'photoURL': photoURL })
	});
}
