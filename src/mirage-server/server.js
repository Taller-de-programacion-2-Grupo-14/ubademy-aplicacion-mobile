import { createServer } from 'miragejs';
export function makeServer({ environment = 'test' } = {}) {

	let server = createServer({
		environment,
		routes() {
			this.post(`${global.host}/users/login`, () => {
				return {
					'message': 'user other1 is logged correctly',
					'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im90aGVyMSIsInBhc3N3b3JkIjoiY29zaXRvYXNkYXNkIiwiZGF0ZSI6IjIwMjEtMTAtMDRUMDI6MjE6NDIuNzgyWiIsImlhdCI6MTYzMzU2MzE5NywiZXhwIjoxNjMzNTcwMzk3fQ.w0smYVVCuzE5TtROeoiFNVvN-gcCIIb4eCYLIdzP9T8',
					'status': 200
				};
			});
			this.post(`${global.host}/users`, () => {
				return {
					'status': 200
				};
			});
			this.put(`${global.host}/users`, () => {
				return {
					'status': 200
				};
			});
			this.get(`${global.host}/users`, () => {
				return {
					'user_id': 3,
					'first_name': 'pepe',
					'last_name': 'pepardo',
					'role': 'Student',
					'interest': 'merca',
					'email': 'ubademy.14@gmail.com',
					'location': 'transilvania'
				};
			});
			this.put(`${global.host}/users/delete-user`, () => {
				return {
					'status': 200
				};
			});
			this.put(`${global.host}/users/send-email-reset-password`, () => {
				return {
					'status': 200
				};
			});
			this.put(`${global.host}/users/recreate-password`, () => {
				return {
					'status': 200
				};
			});
			this.post(`${global.host}/crearCurso`, () => {
				return {
					'status': 200
				};
			});
			this.post(`${global.host}/buscarCurso`, () => {
				return {
					'status': 200
				};
			});
			this.post(`${global.host}/elegirCurso`, () => {
				return {
					'status': 200
				};
			});
			this.get(`${global.host}/obtenerCursos`, () => {
				return [
					{
						'course_name': 'Taller',
						'creator_name': 'Agustin',
						'subscription': 'Estándar'
					},
					{
						'course_name': 'Organizacion de Datos',
						'creator_name': 'Luis',
						'subscription': 'Premium'
					},
					{
						'course_name': 'Sistemas Operativos',
						'creator_name': 'Clua',
						'subscription': 'Premium'
					}
				];
			});
			this.get(`${global.host}/obtenerCurso`, () => {
				return {
					'course_name': 'Mas Python que nunca',
					'course_description': 'Van a codear muchas cosas en python y van a ver que es alto lenguaje',
					'hashtags': '#Python, #Sarasa',
					'course_type': 'Programacion',
					'amount_exams': 3,
					'subscription': 'Premium',
					'location': 'Obera'
				};
			});
			this.get(`${global.host}/misCursosCreados`, () => {
				return [
					{
						'course_name': 'Algebra',
						'tipo': 'Matematica'
					},
					{
						'course_name': 'Análisis Matemático III',
						'tipo': 'Matematica'
					}
				];
			});
			this.get(`${global.host}/misCursosInscriptos`, () => {
				return [
					{
						'course_name': 'Flores',
						'tipo': 'Jardineria'
					},
					{
						'course_name': 'Tortas',
						'tipo': 'Cocina'
					}
				];
			});
			this.post(`${global.host}/desinscripcionCurso`, () => {
				return {
					'status': 200
				};
			});
		},
	});


	return server;
}
