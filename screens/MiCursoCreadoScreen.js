import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
	NativeBaseProvider,
	Pressable,
	Menu,
	Box,
	Button,
	HStack,
	VStack,
	Modal,
	Text,
	Divider,
	Heading,
	Spinner,
	Link,
	FlatList,
	Flex,
	SearchIcon,
	FormControl,
	Input,
	Stack,
	Image,
	Center
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { cancelarCurso } from '../src/services/cancelarCurso';
import { obtenerCurso } from '../src/services/obtenerCurso';
import { obtenerExamenes } from '../src/services/obtenerExamenes';


MiCursoCreadoScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function MiCursoCreadoScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [showModal, setShowModal] = React.useState(false);
	const [showSearch, setShowSearch] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const [estado, setEstado] = React.useState('');
	const [nombre, setNombre] = React.useState('');
	const [nombreExamen, setNombreExamen] = React.useState('');
	const [examenes, setExamenes] = React.useState([]);
	const isFocused = useIsFocused();
	const [puedeCrearExamen, setPuedeCrearExamen] = React.useState(true);
	let parametro = route.params;

	const cancelar = () =>
		Alert.alert(
			'Cancelar curso',
			'¿Está seguro que desea cancelar a este curso?',
			[
				{
					text: 'No',
					style: 'cancel'
				},
				{
					text: 'Si', style: 'destructive',
					onPress: () => {
						cancelarCurso(String(route.params.id))
							.then((response) => response.json())
							.then((json) => {
								if (json.status === 200) {
									setMessage('Cancelación exitosa');
									setShowModal(true);
								} else {
									setError(true);
									setMessage('Error en la cancelación');
									setShowModal(true);
								}
							});
					}
				}
			]
		);

	const renderItem = ({ item }) => (
		<Link onPress={() => { item['verComoCreador'] = true; item['id_course'] = route.params.id; item['puedeCrearExamen'] = puedeCrearExamen; navigation.navigate('VerExamenScreen', item); }}>
			<Box bg="#0BC86C" p="5" rounded="8" style={{ width: 350, marginVertical: 25 }}>
				<Heading color="cyan.50" mt="2" fontWeight="medium" fontSize="lg" bold>
					{item.title}
				</Heading>
				<Flex>
					<Text mt="2" fontSize="xs" fontWeight="medium" color="cyan.800">
						Ingresar
					</Text>
				</Flex>
			</Box>
		</Link>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			obtenerCurso(String(route.params.id))
				.then(data => data.json())
				.then(json => {
					console.log(json);
					if (json.status === 503) {
						setEstado('Indeterminado (por error 503)');
					} else {
						setNombre(json.message.name);
						if (json.message.cancelled == 0) {
							setEstado('Vigente');
						} else {
							setEstado('Cancelado');
						}
						if (json.message.can_create_exams) {
							setPuedeCrearExamen(true);
						} else {
							setPuedeCrearExamen(false);
						}
					}
				});
			obtenerExamenes(String(route.params.id), nombreExamen)
				.then(data => data.json())
				.then(json => {
					console.log(json);
					if (json.status === 503) {
						setEstado('Indeterminado (por error 503)');
					} else {
						setExamenes(json.message);
					}
					setLoading(false);
				});
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [isFocused])
	);

	this.onSubmit = () => {
		obtenerExamenes(String(route.params.id), nombreExamen)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				setExamenes(json.message);
				setLoading(false);
			});
	};

	return (

		<NativeBaseProvider>
			{
				loading ?
					<View style={spinnerStyles.spinnerStyle}>
						<Spinner color="indigo.500" size="lg" />
					</View> :
					<>
						<Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
							<Modal.Content maxWidth="350">
								<Modal.Body>
									<VStack space={3}>
										<HStack alignItems="center" justifyContent="space-between">
											<Text fontWeight="medium">{message}</Text>
										</HStack>
									</VStack>
								</Modal.Body>
								<Modal.Footer>
									<Button colorScheme="indigo"
										flex="1"
										onPress={() => {
											error ? setShowModal(false) : navigation.navigate('MisCursosScreen');
										}}
									>
										Continuar
									</Button>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
						<Modal isOpen={showSearch} onClose={() => setShowSearch(false)}>
							<Modal.Content maxWidth="400px">
								<Modal.CloseButton />
								<Modal.Header>Búsqueda</Modal.Header>
								<Modal.Body>
									<FormControl>
										<FormControl.Label>Nombre</FormControl.Label>
										<Input onChangeText={(nombre) => setNombreExamen(nombre)} />
									</FormControl>
								</Modal.Body>
								<Modal.Footer>
									<Button.Group space={2}>
										<Button
											variant="ghost"
											colorScheme="blueGray"
											onPress={() => {
												setShowSearch(false);
											}}
										>
											Cancelar
										</Button>
										<Button
											onPress={() => {
												this.onSubmit();
												setShowSearch(false);
												setNombreExamen('');
											}}
										>
											Buscar
										</Button>
									</Button.Group>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
						<Box style={{ position: 'absolute', top: 20, right: 20 }}>
							<Menu
								w="190"
								trigger={(triggerProps) => {
									return (
										<Pressable accessibilityLabel="More options menu" {...triggerProps} >
											<Icon name="more-vert" size={35} />
										</Pressable>
									);
								}}
							>
								<Menu.Item onPress={() => { navigation.navigate('EdicionCursoScreen', route.params); }} >Editar curso</Menu.Item>
								<Menu.Item onPress={() => { navigation.navigate('ListadoAlumnosScreen', route.params.id); }}>Listado de alumnos</Menu.Item>
								<Menu.Item onPress={() => { navigation.navigate('ListadoProfesoresScreen', route.params.id); }}>Listado de profesores</Menu.Item>
								<Menu.Item onPress={() => { parametro['puedeCrearExamen'] = puedeCrearExamen; navigation.navigate('CrearExamenScreen', parametro); }}>Crear exámen</Menu.Item>
								<Menu.Item onPress={() => { navigation.navigate('ABcolaboradorScreen', route.params.id); }}>Alta de colaborador</Menu.Item>
								<Menu.Item onPress={() => { navigation.navigate('ExamenesScreen', route.params.id); }}>Corregir exámenes</Menu.Item>
								<Divider />
								<Menu.Item onPress={() => { navigation.navigate('SubirMultimediaScreen', route.params); }} >Subir contenido multimedia</Menu.Item>
								<Menu.Item onPress={() => { navigation.navigate('VerMultimediaScreen', route.params); }} >Ver contenido multimedia</Menu.Item>
								<Divider />
								<Menu.Item onPress={() => { navigation.navigate('MiCursoInscriptoScreen', route.params); }} >Ver curso como estudiante</Menu.Item>
								<Menu.Item onPress={cancelar} >Cancelar curso</Menu.Item>
								<Menu.Item onPress={() => { navigation.navigate('MisCursosScreen'); }} >Salir del curso</Menu.Item>
							</Menu>
						</Box>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="12" style={{ justifyContent: 'center' }}>
							<Stack
								direction={['column', 'column', 'row']}
								rounded="lg"
								overflow="hidden"
								w="90%"
								shadow="1"
								_light={{ backgroundColor: 'coolGray.50' }}
								_dark={{ backgroundColor: 'gray.700' }}>
								<Box>
									<Image
										w={['100%', '100%', '40']}
										h="40"
										source={{
											uri:
												(route.params.profile_pic_url == '') ? 'https://firebasestorage.googleapis.com/v0/b/uba-demy.appspot.com/o/imagenes%2Fbanners%2Fgenerica.jpeg?alt=media&token=a62d3455-4a3c-4ca3-ab19-4df2d63c2ce9' :
													route.params.profile_pic_url,
										}}
										alt="image"
									/>
									<Center
										bg="violet.500"
										_text={{ color: 'white', fontWeight: '700', fontSize: 'xs' }}
										position="absolute"
										bottom="0"
										px="3"
										py="1.5">
										{estado}
									</Center>
								</Box>
								<Stack p="4" space={[3, 3, 1.5]}>
									<Heading size="md" ml="-1">
										{nombre}
									</Heading>
								</Stack>
							</Stack>
							<Divider my="5" />
							<HStack>
								<Heading size="xl" color="coolGray.800" fontWeight="600">
									Exámenes
								</Heading>
								<Link onPress={() => setShowSearch(true)} style={{ position: 'absolute', right: -15 }}>
									<SearchIcon size="8" />
								</Link>
							</HStack>
							<FlatList
								data={examenes}
								renderItem={renderItem}
								keyExtractor={item => String(item.title)}
							/>
						</Box>
					</>
			}
		</NativeBaseProvider>
	);
}

const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default MiCursoCreadoScreen;
