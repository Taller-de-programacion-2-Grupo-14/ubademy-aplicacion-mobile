export function editarUsuario(name, location, interes) {
    //cambiar la url por la de heroku cuando el mirage este desactivado
    return fetch('http://10.0.2.2:8080/modificar', {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": name, "location": location, "interes": interes })
    })
}
