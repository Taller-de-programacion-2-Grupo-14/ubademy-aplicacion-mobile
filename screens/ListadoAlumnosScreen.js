import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	FlatList,
	Modal,
	FormControl,
	Input,
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
	route: PropTypes.object.isRequired,
};

//function ListadoAlumnosScreen({ navigation }) {
function ListadoAlumnosScreen({ route }) {
	const [loading, setLoading] = React.useState(true);
	const [alumnos, setAlumnos] = React.useState([]);
	const [showModal, setShowModal] = useState(false);
	const [nombre, setNombre] = React.useState('');
	const [apellido, setApellido] = React.useState('');

	const renderItem = ({ item }) => (
		<Text fontSize="md">
			{item.apellido}, {item.nombre}
		</Text>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			obtenerAlumnos(route.params, nombre, apellido)
				.then((response) => response.json())
				.then((json) => {
					setLoading(false);
					setAlumnos(json);
				});
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);

	this.onSubmit = () => {
		obtenerAlumnos(route.params, nombre, apellido)
			.then((response) => response.json())
			.then((json) => {
				setLoading(false);
				setAlumnos(json);
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
								keyExtractor={item => item.id}
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
