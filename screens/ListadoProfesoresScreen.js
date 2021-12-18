import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
	NativeBaseProvider,
	Box,
	FlatList,
	Modal,
	FormControl,
	Input,
	VStack,
	HStack,
	Button,
	Divider,
	Link,
	Text,
	SearchIcon,
	Heading,
	Spinner,
	Avatar,
	Spacer
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerAlumnos } from '../src/services/obtenerAlumnos';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { bajaDeColaborador } from '../src/services/bajaDeColaborador';

ListadoProfesoresScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};



function ListadoProfesoresScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [profesores, setProfesores] = React.useState([]);
	const [showModal, setShowModal] = useState(false);
	const [nombre, setNombre] = React.useState('');
	const [apellido, setApellido] = React.useState('');
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const [showModalError, setShowModalError] = React.useState(false);
	const isFocused = useIsFocused();

	function baja(nombreAEliminar, idColaboradorAEliminar) {
		Alert.alert(
			'Baja de colaborador',
			'¿Está seguro que desea dar de baja a ' + nombreAEliminar + '?',
			[
				{
					text: 'No',
					style: 'cancel'
				},
				{ text: 'Si', style: 'destructive',
					onPress: () => {
						bajaDeColaborador(String(route.params), idColaboradorAEliminar)
							.then((response) => response.json())
							.then((json) => {
								if (json.status === 200) {
									setMessage('Baja exitosa');
									setShowModalError(true);
								} else {
									setError(true);
									setMessage('Error en la baja');
									setShowModalError(true);
								}
							});
					}
				}
			]
		);
	}

	const renderItem = ({ item }) => (
		<Box safeArea flex={1} w="90%" mx="auto"  style={{ justifyContent: 'center', top: 20 }}>
			<View style={{flexDirection:'row'}}>
				<HStack alignItems="center" space={3}>
					{(item.photo_url == '' || item.photo_url == null || item.photo_url == 'undefined') ? (<Avatar bg="indigo.500" size="48px" >{item.first_name.charAt(0).toUpperCase()}</Avatar>) :
						<Avatar size="48px" source={{ uri: item.photo_url }} />
					}
					<VStack>
						<Text color="coolGray.800" _dark={{ color: 'warmGray.50' }} bold>
							{item.first_name} {item.last_name}
						</Text>
					</VStack>
					<Spacer />
				</HStack>
				<Button colorScheme="red" _text={{ color: 'white' }} style={{ position: 'absolute', right: 20, top: 6}}
					onPress={() => baja(item.first_name + ' ' + item.last_name, item.user_id)} >
					Dar de baja
				</Button>
			</View>
			<Divider my="3" />
		</Box>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			obtenerAlumnos(String(route.params), nombre, apellido, false)
				.then((response) => response.json())
				.then((json) => {
					console.log(json);
					if (json.status === 503){
						setMessage('courses service is currently unavailable, please try later');
						setError(true);
						setShowModalError(true);
					} else {
						setProfesores(json.message);
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
		obtenerAlumnos(String(route.params), nombre, apellido, false)
			.then((response) => response.json())
			.then((json) => {
				setProfesores(json.message);
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
						<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
							<Modal.Content maxWidth="400px">
								<Modal.CloseButton />
								<Modal.Header>Búsqueda</Modal.Header>
								<Modal.Body>
									<FormControl>
										<FormControl.Label>Nombre</FormControl.Label>
										<Input onChangeText={(nombre) => setNombre(nombre)} />
									</FormControl>
									<FormControl mt="3">
										<FormControl.Label>Apellido</FormControl.Label>
										<Input onChangeText={(apellido) => setApellido(apellido)} />
									</FormControl>
								</Modal.Body>
								<Modal.Footer>
									<Button.Group space={2}>
										<Button
											variant="ghost"
											colorScheme="blueGray"
											onPress={() => {
												setShowModal(false);
											}}
										>
										Cancelar
										</Button>
										<Button
											onPress={() => {
												this.onSubmit();
												setShowModal(false);
												setNombre('');
												setApellido('');
											}}
										>
										Buscar
										</Button>
									</Button.Group>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
						<Modal isOpen={showModalError} onClose={() => setShowModalError(false)} size="lg">
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
											error ? setShowModalError(false) : navigation.goBack();
										}}
									>
										Continuar
									</Button>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
						<Link onPress={() => setShowModal(true)} style={{ position: 'absolute', right: 20, top: 10 }}>
							<SearchIcon size="8" />
						</Link>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center', top: 20 }}>
							<Heading size="xl" color="coolGray.800" fontWeight="600" bold>
							Listado de profesores{'\n'}
							</Heading>
							<FlatList
								data={profesores}
								renderItem={renderItem}
								keyExtractor={item => String(item.user_id)}
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

export default ListadoProfesoresScreen;
