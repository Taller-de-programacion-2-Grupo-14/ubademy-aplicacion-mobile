import { createServer } from 'miragejs';
export function makeServer({ environment = 'test' } = {}) {

	let server = createServer({
		environment,
		routes() {
			this.post('http://10.0.2.2:8080/users/login', (user, password) => {
				return {
					'message': 'user other1 is logged correctly',
					'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im90aGVyMSIsInBhc3N3b3JkIjoiY29zaXRvYXNkYXNkIiwiZGF0ZSI6IjIwMjEtMTAtMDRUMDI6MjE6NDIuNzgyWiIsImlhdCI6MTYzMzU2MzE5NywiZXhwIjoxNjMzNTcwMzk3fQ.w0smYVVCuzE5TtROeoiFNVvN-gcCIIb4eCYLIdzP9T8',
					'status': 200
				};
			});
			this.post('http://10.0.2.2:8080/registrar', (mail, password, name, lastName, perfil, location, interests) => {
				return {
					'status': 200
				};
			});
			this.put('http://10.0.2.2:8080/modificar', (firstName, lastName, location, intrests, email) => {
				return {
					'status': 200
				};
			});
			this.get('http://10.0.2.2:8080/obtenerUsuario', () => {
				return {
					"user_id": 3,
  				"first_name": "pepe",
  				"last_name": "pepardo",
  				"role": "Student",
  				"interest": "merca",
  				"email": "ubademy.14@gmail.com",
  				"location": "transilvania"
				};
			});
			this.put('http://10.0.2.2:8080/eliminar', () => {
				return {
					'status': 200
				};
			});
			this.put('http://10.0.2.2:8080/password', (mail) => {
				return {
					'status': 200
				};
			});
			this.put('http://10.0.2.2:8080/recuperoPassword', (token, newPassword) => {
				return {
					'status': 200
				};
			});
			this.post('http://10.0.2.2:8080/crearCurso', (titulo, descripcion, hashtags, tipo, examenes, suscripcion, location) => {
				return {
					'status': 200
				};
			});
		},
	});


	return server;
}
