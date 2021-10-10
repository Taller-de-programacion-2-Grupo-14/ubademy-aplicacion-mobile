export function login(user, password) {
    //cambiar la url por la de heroku cuando el mirage este desactivado
    return fetch('http://10.0.2.2:8080/users/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "username": user, "password": password })
    })
}
