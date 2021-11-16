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
	ScrollView,
	Spinner
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { cancelarCurso } from '../src/services/cancelarCurso';
import { obtenerCurso } from '../src/services/obtenerCurso';

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

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			obtenerCurso(String(route.params.id))
				.then(data => data.json())
				.then(json => {
					console.log(json);
					if (json.message.cancelled == 0){
						setEstado("Vigente");
					} else {
						setEstado("Cancelado")
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
					<ScrollView
						_contentContainerStyle={{
							px: '20px',
							mb: '4',
						}}
					>
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
						<Box style={{top: 20, alignItems: 'flex-end'}}>
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
								<Menu.Item onPress={() => {navigation.navigate('EdicionCursoScreen', route.params)}} >Editar curso</Menu.Item>
								<Menu.Item onPress={() => {navigation.navigate('ListadoAlumnosScreen', route.params.id)}}>Listado de alumnos</Menu.Item>
								<Menu.Item>Crear examen</Menu.Item>
								<Divider />
								<Menu.Item onPress={() => {navigation.navigate('MiCursoInscriptoScreen', route.params);}} >Ver curso como estudiante</Menu.Item>
								<Divider />
								<Menu.Item onPress={cancelar} >Cancelar curso</Menu.Item>
								<Menu.Item onPress={() => {navigation.navigate('MisCursosScreen');}} >Salir del curso</Menu.Item>
							</Menu>
						</Box>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<Heading size="xl" color="coolGray.800" fontWeight="600">
								{ route.params.name }
							</Heading>
							<Heading size="md" color="coolGray.800" fontWeight="600">
								{'\n'}Estado: { estado }
							</Heading>
						</Box>
					</ScrollView>
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
