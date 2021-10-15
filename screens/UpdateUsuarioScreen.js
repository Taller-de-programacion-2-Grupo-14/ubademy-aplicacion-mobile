import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
	NativeBaseProvider,
	Box,
	Text,
	Heading,
	VStack,
	FormControl,
	Input,
	Button,
	HStack,
	Modal,
	ScrollView,
	Spinner
} from 'native-base';
import { editarUsuario } from '../src/services/editarUsuario';
import { obtenerUsuario } from '../src/services/obtenerUsuario';
import { useFocusEffect } from '@react-navigation/native';


export default function UpdateUsuarioScreen({ navigation }) {
	const [firstName, setFirstName] = React.useState('');
	const [lastName, setLastName] = React.useState('');
	const [location, setLocation] = React.useState('');
	const [intrests, setIntrests] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [showModal, setShowModal] = React.useState(false);
	const [modalMessage, setModalMessage] = React.useState('');
	const [loading, setLoading] = React.useState(true);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			obtenerUsuario()
				.then(data => data.json())
				.then(json => {
					setLoading(false);
					console.log('useeffect de update usuario');
					console.log(json);
					setFirstName(json.first_name);
					setLastName(json.last_name);
					setEmail(json.email);
					setLocation(json.location);
				});
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);

	this.onSubmit = () => {
		editarUsuario(firstName, lastName, location, intrests, email)
			.then((response) => response.json())
			.then((json) => {
				console.log('editar usuario ');
				console.log(json);
				if (json.status === 200) {
					setShowModal(true);
					setModalMessage('Datos actualizados');
				} else {
					setShowModal(true);
					setModalMessage('Ha ocurrido un error');
				}
			});
	};

	return (

		<NativeBaseProvider>
			<Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
				<Modal.Content maxWidth="350">
					<Modal.Body>
						<VStack space={3}>
							<HStack alignItems="center" justifyContent="space-between">
								<Text fontWeight="medium">{modalMessage}</Text>
							</HStack>
						</VStack>
					</Modal.Body>
					<Modal.Footer>
						<Button colorScheme="indigo"
							flex="1"
							onPress={() => {
								navigation.navigate('HomeScreen');
							}}
						>
              Continuar
						</Button>
					</Modal.Footer>
				</Modal.Content>
			</Modal>

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
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<Heading size="lg" color="coolGray.800" fontWeight="600">
                Editar usuario
							</Heading>

							<VStack space={3} mt="5">
								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                    Email
									</FormControl.Label>
									<Input onChangeText={(email) => setEmail(email)} value={email} />
								</FormControl>
								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                    Nombre
									</FormControl.Label>
									<Input onChangeText={(firstName) => setFirstName(firstName)} value={firstName} />
								</FormControl>
								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                    Apellido
									</FormControl.Label>
									<Input onChangeText={(lastName) => setLastName(lastName)} value={lastName} />
								</FormControl>

								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                    Ubicacion
									</FormControl.Label>
									<Input onChangeText={(location) => setLocation(location)} value={location} />
								</FormControl>

								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                    Tipo de curso de mayor interes
									</FormControl.Label>
									<Input onChangeText={(intrests) => setIntrests(intrests)} value={intrests} />
								</FormControl>
								<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()} >
                  Confirmar
								</Button>
							</VStack>
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

UpdateUsuarioScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
};
