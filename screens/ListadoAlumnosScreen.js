import React from 'react';
import { View, StyleSheet } from 'react-native';
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
	Link,
	Text,
	SearchIcon,
	Heading,
	Spinner
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerAlumnos } from '../src/services/obtenerAlumnos';
import PropTypes from 'prop-types';
import { useState } from 'react';

ListadoAlumnosScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function ListadoAlumnosScreen({ navigation, route }) {
//function ListadoAlumnosScreen({ route }) {
	const [loading, setLoading] = React.useState(true);
	const [alumnos, setAlumnos] = React.useState([]);
	const [showModal, setShowModal] = useState(false);
	const [nombre, setNombre] = React.useState('');
	const [apellido, setApellido] = React.useState('');
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const [showModalError, setShowModalError] = React.useState(false);
	const isFocused = useIsFocused();

	const renderItem = ({ item }) => (
		<Text fontSize="md">
			{item.last_name}, {item.first_name}
		</Text>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			obtenerAlumnos(String(route.params), nombre, apellido)
				.then((response) => response.json())
				.then((json) => {
					console.log(json);
					if (json.status === 503){
						setMessage('courses service is currently unavailable, please try later');
						setError(true);
						setShowModalError(true);
					} else {
						setAlumnos(json.message);
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
		obtenerAlumnos(String(route.params), nombre, apellido)
			.then((response) => response.json())
			.then((json) => {
				setAlumnos(json.message);
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
												this.onSubmit,
												setShowModal(false);
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
							<Heading size="lg" color="coolGray.800" fontWeight="600">
							Listado de alumnos{'\n'}
							</Heading>
							<FlatList
								data={alumnos}
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

export default ListadoAlumnosScreen;
