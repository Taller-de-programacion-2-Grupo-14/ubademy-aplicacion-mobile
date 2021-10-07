import { createServer } from 'miragejs';
export function makeServer({ environment = 'test' } = {}) {

    let server = createServer({
        environment,
        routes() {
            this.get("/api/cursos", () => {
                return {
                    cursos: [
                        { id: 1, name: "Data Science", year: 2010 },
                        { id: 2, name: "Docker", year: 2014 },
                        { id: 3, name: "Matematica", year: 2017 },
                    ],
                }
            })
            this.post("http://10.0.2.2:8080/users/login", (usuario, password) => {
                return {

                    "message": "user other1 is logged correctly",
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im90aGVyMSIsInBhc3N3b3JkIjoiY29zaXRvYXNkYXNkIiwiZGF0ZSI6IjIwMjEtMTAtMDRUMDI6MjE6NDIuNzgyWiIsImlhdCI6MTYzMzU2MzE5NywiZXhwIjoxNjMzNTcwMzk3fQ.w0smYVVCuzE5TtROeoiFNVvN-gcCIIb4eCYLIdzP9T8",
                    "status": 200


                }
            })
            this.get("http://10.0.2.2:8080/users", () => {
                return {
                    "username": "other1"
                }
            })
        },
    })


    return server;
}
