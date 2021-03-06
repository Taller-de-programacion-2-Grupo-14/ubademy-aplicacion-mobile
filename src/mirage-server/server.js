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
			this.patch(`${global.host}/users`, () => {
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
			this.post(`${global.host}/courses/create`, () => {
				return {
					'status': 200
				};
			});
			this.post(`${global.host}/courses/subscription/:id`, () => {
				return {
					'status': 200
				};
			});
			this.get(`${global.host}/courses`, () => {
				return {
					'message': [
						{
							'name': 'Taller',
							'creator_first_name': 'Franco',
							'creator_last_name': 'Armani',
							'description': 'Van a codear muchas cosas en python y van a ver que es alto lenguaje',
							'hashtags': 'Python, Sarasa',
							'type': 'Programación',
							'exams': 3,
							'subscription': 'Premium',
							'location': 'Obera',
							'id': 5,
							'estado': 'Vigente',
							'can_edit': false,
							'is_subscribed': false,
							'can_subscribed': false
						},
						{
							'name': 'Organizacion de Datos',
							'creator_first_name': 'Luis',
							'creator_last_name': 'Argerich',
							'description': 'Van a codear muchas cosas en python y van a ver que es alto lenguaje',
							'hashtags': 'Python, Sarasa',
							'type': 'Programación',
							'exams': 3,
							'subscription': 'Premium',
							'location': 'Obera',
							'id': 6,
							'estado': 'Vigente',
							'can_edit': false,
							'is_subscribed': true,
							'can_subscribed': false
						},
						{
							'name': 'Sistemas Operativos',
							'creator_first_name': 'Osvaldo',
							'creator_last_name': 'Clua',
							'description': 'Van a codear muchas cosas en python y van a ver que es alto lenguaje',
							'hashtags': 'Python, Sarasa',
							'type': 'Programación',
							'exams': 3,
							'subscription': 'Premium',
							'location': 'Obera',
							'id': 7,
							'estado': 'Vigente',
							'can_edit': true,
							'is_subscribed': false,
							'can_subscribed': false
						},
						{
							'name': 'Algoritmos y Programacion I',
							'creator_first_name': 'Tony',
							'creator_last_name': 'Montana',
							'description': 'Van a codear muchas cosas en python y van a ver que es alto lenguaje',
							'hashtags': 'Python, Sarasa',
							'type': 'Programación',
							'exams': 3,
							'subscription': 'Premium',
							'location': 'Obera',
							'id': 8,
							'estado': 'Vigente',
							'can_edit': false,
							'is_subscribed': false,
							'can_subscribed': true
						}
					],
					'status': 200
				};
			});
			this.get(`${global.host}/courses/favorites`, () => {
				return {
					'message': [
						{
							'name': 'Fisica Newtoniana',
							'creator_first_name': 'Franco',
							'creator_last_name': 'Armani',
							'description': 'Van a codear muchas cosas en python y van a ver que es alto lenguaje',
							'hashtags': 'Python, Sarasa',
							'type': 'Programación',
							'exams': 3,
							'subscription': 'Premium',
							'location': 'Obera',
							'id': 5,
							'estado': 'Vigente',
							'can_edit': false,
							'is_subscribed': false,
							'can_subscribed': true
						},
						{
							'name': 'Fisica Relativista',
							'creator_first_name': 'Luis',
							'creator_last_name': 'Argerich',
							'description': 'Van a codear muchas cosas en python y van a ver que es alto lenguaje',
							'hashtags': 'Python, Sarasa',
							'type': 'Programación',
							'exams': 3,
							'subscription': 'Premium',
							'location': 'Obera',
							'id': 6,
							'estado': 'Vigente',
							'can_edit': false,
							'is_subscribed': true,
							'can_subscribed': false
						},
						{
							'name': 'Fisica Cuantica',
							'creator_first_name': 'Osvaldo',
							'creator_last_name': 'Clua',
							'description': 'Van a codear muchas cosas en python y van a ver que es alto lenguaje',
							'hashtags': 'Python, Sarasa',
							'type': 'Programación',
							'exams': 3,
							'subscription': 'Premium',
							'location': 'Obera',
							'id': 7,
							'estado': 'Vigente',
							'can_edit': true,
							'is_subscribed': false,
							'can_subscribed': false
						}
					],
					'status': 200
				};
			});
			this.get(`${global.host}/courses/1`, () => {
				return {
					'name': 'Algebra',
					'creator_name': 'Essaya',
					'description': 'Van a codear muchas cosas en python y van a ver que es alto lenguaje',
					'hashtags': 'Python, Sarasa',
					'type': 'Programación',
					'exams': 3,
					'subscription': 'Premium',
					'location': 'Obera',
					'canEdit': true,
					'estado': 'Vigente'
				};
			});
			this.get(`${global.host}/courses/2`, () => {
				return {
					'name': 'Análisis Matemático III',
					'creator_name': 'Essaya',
					'description': 'Van a codear muchas cosas en python y van a ver que es alto lenguaje',
					'hashtags': 'Python, Sarasa',
					'type': 'Programación',
					'exams': 3,
					'subscription': 'Premium',
					'location': 'Obera',
					'canEdit': true,
					'estado': 'Vigente'
				};
			});
			this.get(`${global.host}/courses/3`, () => {
				return {
					'name': 'Flores',
					'creator_name': 'Essaya',
					'description': 'Van a codear muchas cosas en python y van a ver que es alto lenguaje',
					'hashtags': 'Python, Sarasa',
					'type': 'Programación',
					'exams': 3,
					'subscription': 'Premium',
					'location': 'Obera',
					'canEdit': true,
					'estado': 'Vigente'
				};
			});
			this.get(`${global.host}/courses/4`, () => {
				return {
					'name': 'Tortas',
					'creator_name': 'Essaya',
					'description': 'Van a codear muchas cosas en python y van a ver que es alto lenguaje',
					'hashtags': 'Python, Sarasa',
					'type': 'Programación',
					'exams': 3,
					'subscription': 'Premium',
					'location': 'Obera',
					'canEdit': true,
					'estado': 'Vigente'
				};
			});
			this.get(`${global.host}/courses/5`, () => {
				return {
					'name': 'Taller',
					'creator_name': 'Agustin',
					'description': 'Van a codear muchas cosas en python y van a ver que es alto lenguaje',
					'hashtags': 'Python, Sarasa',
					'type': 'Programación',
					'exams': 3,
					'subscription': 'Premium',
					'location': 'Obera',
					'canEdit': true,
					'estado': 'Vigente'
				};
			});
			this.get(`${global.host}/courses/6`, () => {
				return {
					'name': 'Organizacion de Datos',
					'creator_name': 'Luis',
					'description': 'Van a codear muchas cosas en python y van a ver que es alto lenguaje',
					'hashtags': 'Python, Sarasa',
					'type': 'Programación',
					'exams': 3,
					'subscription': 'Premium',
					'location': 'Obera',
					'canEdit': true,
					'estado': 'Vigente'
				};
			});
			this.get(`${global.host}/courses/7`, () => {
				return {
					'name': 'Sistemas Operativos',
					'creator_name': 'Clua',
					'description': 'Van a codear muchas cosas en python y van a ver que es alto lenguaje',
					'hashtags': 'Python, Sarasa',
					'type': 'Programación',
					'exams': 3,
					'subscription': 'Premium',
					'location': 'Obera',
					'canEdit': true,
					'estado': 'Vigente'
				};
			});
			this.get(`${global.host}/courses/my_courses`, () => {
				return {
					'message': [
						{
							'name': 'Algebra',
							'id': 1,
							'type': 'Matematica',
							'can_create': true
						},
						{
							'name': 'Análisis Matemático III',
							'id': 2,
							'type': 'Matematica'
						}],
					'status': 200
				};
			});
			this.get(`${global.host}/courses/my_subscriptions`, () => {
				return {
					'message': [
						{
							'name': 'Arboles',
							'id': 1,
							'type': 'Jardineria'
						},
						{
							'name': 'Plantas carnivoras',
							'id': 2,
							'type': 'Jardineria'
						}],
					'status': 200
				};
			});
			this.delete(`${global.host}/courses/subscription/:id`, () => {
				return {
					'status': 200
				};
			});
			this.patch(`${global.host}/courses/:id`, () => {
				return {
					'status': 200
				};
			});
			this.delete(`${global.host}/courses/:id`, () => {
				return {
					'status': 200
				};
			});
			this.get(`${global.host}/courses/users/:id`, () => {
				return {
					'message': [
						{
							'user_id': 1,
							'last_name': 'Pacino',
							'first_name': 'Al'
						},
						{
							'user_id': 2,
							'last_name': 'Cameron',
							'first_name': 'James'
						},
						{
							'user_id': 3,
							'last_name': 'Tarantino',
							'first_name': 'Quentin'
						}],
					'status': 200
				};
			});
			this.get(`${global.host}/courses/:id/view`, () => {
				return {
					'message': {
						'name': 'Quimica',
						'cancelled': 0,
						'id': 27,
						'favorito': false,
						'can_create': true,
					},
					'status': 200
				};
			});
			this.get(`${global.host}/courses/my_collaborations`, () => {
				return {
					'message': [
						{
							'name': 'Empanadas',
							'id': 5,
							'type': 'Cocina'
						},
						{
							'name': 'Pizzas',
							'id': 6,
							'type': 'Cocina'
						}],
					'status': 200
				};
			});
			this.delete(`${global.host}/courses/colaborador/:id`, () => {
				return {
					'status': 200
				};
			});
			this.get(`${global.host}/courses/historical`, () => {
				return {
					'message': [
						{
							'id': 1,
							'name': 'Pensamiento Cientifico',
							'cancelado': 0
						},
						{
							'id': 2,
							'name': 'Sociedad y Estado',
							'cancelado': 1
						},
						{
							'id': 3,
							'name': 'Fisica cuantica',
							'cancelado': 0
						}],
					'status': 200
				};
			});
			this.delete(`${global.host}/courses/collaborators/remove`, () => {
				return {
					'status': 200
				};
			});
			this.post(`${global.host}/courses/favorites`, () => {
				return {
					'status': 200
				};
			});
			this.delete(`${global.host}/courses/favorites/remove`, () => {
				return {
					'status': 200
				};
			});
			this.get(`${global.host}/exams/:id`, () => {
				return {
					'message': [
						{
							'id_exam': 1,
							'title': 'Parcial 1 - Termodinamica',
							'questions': [
								'¿Cual es el segundo principio de la termodinamica?',
								'¿Tenet es horrible o solo muy mala?'
							]
						},
						{
							'id_exam': 2,
							'title': 'Parcial 2 - Electroquimica',
							'questions': [
								'¿Que gusto tiene la sal?',
								'¿Cual es el sentido de la vida?'
							]
						},
						{
							'id_exam': 3,
							'title': 'Parcial 3 - Corrosion',
							'questions': [
								'¿Quien descubrio america?',
								'¿Cuanto es 2+2?'
							]
						}],
					'status': 200
				};
			});
			this.post(`${global.host}/exams/create`, () => {
				return {
					'status': 200
				};
			});
			this.post(`${global.host}/exams/resolve/:id`, () => {
				return {
					'status': 200
				};
			});
			this.post(`${global.host}/exams/publish`, () => {
				return {
					'status': 200
				};
			});
			this.get(`${global.host}/resolutions/:id`, () => {
				return {
					'message': [
						{
							'id_student': 1,
							'exam_id': 1,
							'nombre_alumno': 'German',
							'exam_name': 'Parcial 1 - Termodinamica',
							'questions': [
								'¿Cual es el segundo principio de la termodinamica?',
								'¿Tenet es horrible o solo muy mala?'
							],
							'answers': [
								'La cantidad de entropía del universo tiende a incrementarse en el tiempo.',
								'Es horrible'
							],
							'correction': 'Es el mejor exámen que he visto en mi vida.',
							'status': 'Aprobado'
						},
						{
							'id_student': 2,
							'exam_id': 2,
							'nombre_alumno': 'Luke',
							'exam_name': 'Parcial 2 - Electroquimica',
							'questions': [
								'¿Que gusto tiene la sal?',
								'¿Cual es el sentido de la vida?'
							],
							'answers': [
								'Salada.',
								'Mantenerte ocupado con tonterías insignificantes hasta que eventualmente estés muerto.'
							],
							'correction': 'Y, eeeeh, mas o menos.',
							'status': 'Aprobado'
						},
						{
							'id_student': 3,
							'exam_id': 3,
							'nombre_alumno': 'Marty',
							'exam_name': 'Parcial 3 - Corrosion',
							'questions': [
								'¿Quien descubrio america?',
								'¿Cuanto es 2+2?'
							],
							'answers': [
								'Enrique Borja',
								'5'
							],
							'correction': 'Es el peor exámen que he visto en mi vida.',
							'status': 'Desaprobado'
						}],
					'status': 200
				};
			});
			this.patch(`${global.host}/resolution/grade`, () => {
				return {
					'status': 200
				};
			});
			this.put(`${global.host}/exams/edit`, () => {
				return {
					'status': 200
				};
			});
			this.post(`${global.host}/courses/collaborators/send_request`, () => {
				return {
					'status': 200
				};
			});
			this.post(`${global.host}/courses/multimedia/:id`, () => {
				return {
					'status': 200
				};
			});
			this.get(`${global.host}/courses/multimedia/:id`, () => {
				return {
					'message': [
						{
							'title': 'Tema 1',
							'url': 'https://firebasestorage.googleapis.com/v0/b/uba-demy.appspot.com/o/imagenes%2Fmultimedia%2F202111202111202111717?alt=media&token=bd7ceb33-e85f-404c-b352-49d72a9e765a'
						},
						{
							'title': 'Tema 2',
							'url': 'https://firebasestorage.googleapis.com/v0/b/uba-demy.appspot.com/o/imagenes%2Fmultimedia%2F202111202111202111658?alt=media&token=6f42a39c-c69f-450a-832b-a412bd5183eb'
						},
						{
							'title': 'Tema 3',
							'url': 'https://firebasestorage.googleapis.com/v0/b/uba-demy.appspot.com/o/imagenes%2Fmultimedia%2F202111202111202111404?alt=media&token=1433f65f-5a62-4721-9276-f6d70cbf1583'
						}],
					'status': 200
				};
			});
		},
	});


	return server;
}
