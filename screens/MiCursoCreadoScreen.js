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
	Flex
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
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const [estado, setEstado] = React.useState('');
	const [nombre, setNombre] = React.useState('');
	const [examenes, setExamenes] = React.useState([]);
	const isFocused = useIsFocused();

	const cancelar = () =>
		Alert.alert(
			'Cancelar curso',
			'¿Está seguro que desea cancelar a este curso?',
			[
				{
					text: 'No',
					style: 'cancel'
				},
				{ text: 'Si', style: 'destructive',
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
		<Link >
			<Box bg="#0BC86C" p="5" rounded="8" style={{ width: 350, marginVertical: 25}}>
				<Heading color="cyan.50" mt="2" fontWeight="medium" fontSize="lg" bold>
					{item.nombre}
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
						if (json.message.cancelled == 0){
							setEstado('Vigente');
						} else {
							setEstado('Cancelado');
						}
					}
				});
			obtenerExamenes(String(route.params.id))
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
						<Box style={{position: 'absolute', top: 20, right: 20}}>
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
								<Menu.Item onPress={() => {navigation.navigate('EdicionCursoScreen', route.params);}} >Editar curso</Menu.Item>
								<Menu.Item onPress={() => {navigation.navigate('ListadoAlumnosScreen', route.params.id);}}>Listado de alumnos</Menu.Item>
								<Menu.Item onPress={() => {navigation.navigate('ListadoProfesoresScreen', route.params.id);}}>Listado de profesores</Menu.Item>
								<Menu.Item onPress={() => {navigation.navigate('CrearExamenScreen', route.params.id);}}>Crear examen</Menu.Item>
								<Menu.Item onPress={() => {navigation.navigate('ABcolaboradorScreen', route.params.id);}}>Alta/Baja de colaborador</Menu.Item>
								<Divider />
								<Menu.Item onPress={() => {navigation.navigate('MiCursoInscriptoScreen', route.params);}} >Ver curso como estudiante</Menu.Item>
								<Divider />
								<Menu.Item onPress={cancelar} >Cancelar curso</Menu.Item>
								<Menu.Item onPress={() => {navigation.navigate('MisCursosScreen');}} >Salir del curso</Menu.Item>
							</Menu>
						</Box>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="12" style={{ justifyContent: 'center' }}>
							<Heading size="xl" color="coolGray.800" fontWeight="600" bold>
								{ nombre }
							</Heading>
							<Heading size="md" color="coolGray.800" fontWeight="600">
								{'\n'}Estado: { estado }
							</Heading>
							<Divider my="5" />
							<Heading size="xl" color="coolGray.800" fontWeight="600">
								Exámenes
							</Heading>
							<FlatList
								data={examenes}
								renderItem={renderItem}
								keyExtractor={item => String(item.id)}
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
