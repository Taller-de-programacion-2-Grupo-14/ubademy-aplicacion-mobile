export function register(mail, password, name, perfil, location, interes) {
    //cambiar la url por la de heroku cuando el mirage este desactivado
    return fetch('http://10.0.2.2:8080/registrar', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "mail": mail, "password": password, "name": name, "perfil": perfil, "location": location, "interes": interes })
    })
}
