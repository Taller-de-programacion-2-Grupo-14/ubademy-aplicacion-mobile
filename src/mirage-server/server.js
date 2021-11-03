import { createServer } from 'miragejs';
export function makeServer({ environment = 'test' } = {}) {

	let server = createServer({
		environment,
		routes() {
			this.post(`${global.host}/users/login`, (user, password) => {
				return {
					'message': 'user other1 is logged correctly',
					'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im90aGVyMSIsInBhc3N3b3JkIjoiY29zaXRvYXNkYXNkIiwiZGF0ZSI6IjIwMjEtMTAtMDRUMDI6MjE6NDIuNzgyWiIsImlhdCI6MTYzMzU2MzE5NywiZXhwIjoxNjMzNTcwMzk3fQ.w0smYVVCuzE5TtROeoiFNVvN-gcCIIb4eCYLIdzP9T8',
					'status': 200
				};
			});
			this.post(`${global.host}/registrar`, (mail, password, name, lastName, perfil, location, interests) => {
				return {
					'status': 200
				};
			});
			this.put(`${global.host}/modificar`, (firstName, lastName, location, intrests, email) => {
				return {
					'status': 200
				};
			});
			this.get(`${global.host}/obtenerUsuario`, () => {
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
			this.put(`${global.host}/eliminar`, () => {
				return {
					'status': 200
				};
			});
			this.put(`${global.host}/password`, (mail) => {
				return {
					'status': 200
				};
			});
			this.put(`${global.host}/recuperoPassword`, (token, newPassword) => {
				return {
					'status': 200
				};
			});
			this.post(`${global.host}/crearCurso`, (titulo, descripcion, hashtags, tipo, examenes, suscripcion, location) => {
				return {
					'status': 200
				};
			});
			this.post(`${global.host}/buscarCurso`, (busqueda) => {
				return {
					'status': 200
				};
			});
			this.post(`${global.host}/elegirCurso`, (cursoElegido) => {
				return {
					'status': 200
				};
			});
			this.get(`${global.host}/obtenerCursos`, () => {
				return [
					{
						"course_name": "Taller",
						"creator_name": "Agustin",
						"subscription": "Estándar"
					},
					{
						"course_name": "Organizacion de Datos",
						"creator_name": "Luis",
						"subscription": "Premium"
					},
					{
						"course_name": "Sistemas Operativos",
						"creator_name": "Clua",
						"subscription": "Premium"
					}
				]
			});
			this.get(`${global.host}/obtenerCurso`, (cursoElegido) => {
				return {
					"course_name": "Mas Python que nunca",
					"course_description": "Van a codear muchas cosas en python y van a ver que es alto lenguaje",
					"hashtags": "#Python, #Sarasa",
					"course_type": "Programacion",
					"amount_exams": 3,
					"subscription": "Premium",
					"location": "Obera"
				};
			});
			this.get(`${global.host}/misCursosCreados`, () => {
				return [
					{
						"course_name": "Algebra",
						"tipo": "Matematica"
					},
					{
						"course_name": "Análisis Matemático III",
						"tipo": "Matematica"
					}
				]
			});
			this.get(`${global.host}/misCursosInscriptos`, () => {
				return [
					{
						"course_name": "Flores",
						"tipo": "Jardineria"
					},
					{
						"course_name": "Tortas",
						"tipo": "Cocina"
					}
				]
			});
		},
	});


	return server;
}
