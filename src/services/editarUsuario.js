export function editarUsuario(firstName, lastName, location, intrests, email) {
    //cambiar la url por la de heroku cuando el mirage este desactivado
    return fetch('https://ubademy-14.herokuapp.com/users', {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "first_name": firstName, "last_name": lastName, "location": location, "interest": intrests, "email": email })
    })
}
