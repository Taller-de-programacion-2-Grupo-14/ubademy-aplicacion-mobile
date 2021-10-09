export function register(mail, password, name, perfil, location, interes) {
    return fetch('http://10.0.2.2:8080/registrar', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "mail": mail, "password": password, "name": name, "perfil": perfil, "location": location, "interes": interes })
    })
}
