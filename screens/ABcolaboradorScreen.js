import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	FormControl,
	VStack,
	HStack,
	Text,
	Modal,
	Button,
	Input,
	ScrollView,
	Spinner
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { enviarSolicitudColaborador } from '../src/services/enviarSolicitudColaborador';

ABcolaboradorScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired
};

function ABcolaboradorScreen({ navigation, route }) {
//function ABcolaboradorScreen({ navigation }) {
	const [loading, setLoading] = React.useState(true);
	const [mail, setMail] = React.useState('');
	const [showModal, setShowModal] = useState(false);
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			setLoading(false);
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);

	this.onSubmit = () => {
		enviarSolicitudColaborador(String(route.params), mail)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				if (json.status === 200) {
					setMessage('¡Solicitud enviada con éxito!');
				} else {
					setError(true);
					setMessage('Error al enviar la solicitud');
				}
				setShowModal(true);
			});
	};

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
											error ? setShowModal(false) : navigation.goBack();
										}}
									>
										Continuar
									</Button>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<Heading size="xl" color="coolGray.800" fontWeight="600" bold>
								Alta de un colaborador
							</Heading>
							<VStack space={3} mt="5">
								<FormControl>
									<FormControl.Label>Ingrese el mail del usuario</FormControl.Label>
									<Input onChangeText={(mail) => setMail(mail)} value={mail} />
								</FormControl>
							</VStack>
							<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()}>
                Enviar solicitud de alta
							</Button>
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

export default ABcolaboradorScreen;
