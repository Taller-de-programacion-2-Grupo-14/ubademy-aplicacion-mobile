export function getList() {
    return fetch('/api/cursos')
        .then(data => data.json())
        .then(json => json.cursos)
}