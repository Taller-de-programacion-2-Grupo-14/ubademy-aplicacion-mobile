export function register(mail, password, name, lastName, perfil, location, interests) {
    //cambiar la url por la de heroku cuando el mirage este desactivado
    return fetch('https://ubademy-14.herokuapp.com/users', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "email": mail, "password": password, "first_name": name, "last_name": lastName, "role": perfil, "location": location, "interest": interests.join(",") })
    })
}
