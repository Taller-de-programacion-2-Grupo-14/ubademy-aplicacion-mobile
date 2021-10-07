import { createServer } from 'miragejs';
function makeServer() {

    if (window.server) {
        server.shutdown()
    }

    window.server = createServer({
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
            this.post("/api/users/login", (usuario, password) => {
                return {

                    "message": "user other1 is logged correctly",
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im90aGVyMSIsInBhc3N3b3JkIjoiY29zaXRvYXNkYXNkIiwiZGF0ZSI6IjIwMjEtMTAtMDRUMDI6MjE6NDIuNzgyWiIsImlhdCI6MTYzMzU2MzE5NywiZXhwIjoxNjMzNTcwMzk3fQ.w0smYVVCuzE5TtROeoiFNVvN-gcCIIb4eCYLIdzP9T8",
                    "status": 200


                }
            })
        },
    })


    return server;
}
export default makeServer