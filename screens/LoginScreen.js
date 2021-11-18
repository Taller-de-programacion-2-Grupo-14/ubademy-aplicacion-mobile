import React from 'react';
import { login } from '../src/services/login';
import * as SecureStore from 'expo-secure-store';
import PropTypes from 'prop-types';
import {
	NativeBaseProvider,
	Box,
	Text,
	Heading,
	VStack,
	FormControl,
	Input,
	Link,
	Button,
	HStack,
	Center,
	Image,
	Modal,
	ScrollView,
	Spinner
} from 'native-base';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useValidation } from 'react-native-form-validator';
import { signInWithFacebook } from '../src/utils/auth';
import { userfirebaseLogin } from '../src/services/userFirebaseLogin';

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [showModal, setShowModal] = React.useState(false);
	const [loading, setLoading] = React.useState(true);
	const [mensaje, setMensaje] = React.useState('');
	const { validate, isFieldInError, getErrorsInField, isFormValid } =
		useValidation({
			state: { email, password },
			deviceLocale: 'es'
		});


	useFocusEffect(
		React.useCallback(() => {
			setLoading(false);
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
				setLoading(true);
			};
		}, [])
	);

	const facebookSignIn = () => {
		setLoading(true);
		signInWithFacebook().then((user) => {
			//enviar respuesta al nuevo endpoint y mando solo "user"
			//va a loggear y generar nuevo usuario y devolver 200 si esta bien
			//500 si salio algo mal
			//devuelve token y hago get con el token para llevarlo al homescreen.
			console.log(user.user.displayName);
			console.log(user.user.email);
			console.log(user.user.photoURL);
			userfirebaseLogin(user.user.displayName, user.user.email, user.user.photoURL)
				.then((response) => response.json())
				.then((json) => {
					console.log(json);
					setLoading(false);
					if (json.status === 200) {
						SecureStore.setItemAsync('secure_token', json.token);
						console.log(json.token);
						navigation.navigate('Home');
					} else {
						setMensaje('Error al loggearse con firebase');
						setShowModal(true);
						console.log('Error al loggearse con firebase');
					}
				})
				.catch((error) => console.error(error));
		}).catch((error) => console.error(error));
	};


	this.onSubmit = () => {
		validate({
			email: { email: true, required: true },
			password: { minlength: 6, maxlength: 35, required: true },
		});

		if (isFormValid() == true) {
			login(email, password)
				.then((response) => response.json())
				.then((json) => {
					console.log(json);
					if (json.status === 200) {
						SecureStore.setItemAsync('secure_token', json.token);
						console.log(json.token);
						navigation.navigate('Home');
					}	else {
						if (json.status === 403) {
							setMensaje('Usuario bloqueado');
							setShowModal(true);
						} else {
							setMensaje('Usuario o contraseña invalidos');
							setShowModal(true);
							console.log('email o contrasenia invalidos');
						}
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}

	};
	return (
		<NativeBaseProvider>
			<Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
				<Modal.Content maxWidth="350">
					<Modal.Body>
						<VStack space={3}>
							<HStack alignItems="center" justifyContent="space-between">
								<Text fontWeight="medium">{mensaje}</Text>
							</HStack>
						</VStack>
					</Modal.Body>
					<Modal.Footer>
						<Button colorScheme="indigo"
							flex="1"
							onPress={() => { setShowModal(false); }}
						>
							Continuar
						</Button>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
			{loading ?
				<View style={spinnerStyles.spinnerStyle}>
					<Spinner color="indigo.500" size="lg" />
				</View> :
				<ScrollView>
					<Box safeArea flex={1} p="2" py="8" w="90%" mx="auto" style={{ justifyContent: 'center' }}>
						<Center>
							<Image
								source={require('../images/logo.png')}
								alt="Logo"
								size="xl"
							/>
						</Center>
						<Heading size="lg" fontWeight="600" color="coolGray.800">
							Bienvenido
						</Heading>
						<Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
							Iniciar sesion
						</Heading>

						<VStack space={3} mt="5">
							<FormControl isRequired isInvalid={isFieldInError('email')}>
								<FormControl.Label
									_text={{
										color: 'coolGray.800',
										fontSize: 'xs',
										fontWeight: 500,
									}}>
									Email
								</FormControl.Label>
								<Input onChangeText={(email) => setEmail(email)} />
								{isFieldInError('email') &&
									getErrorsInField('email').map(errorMessage => (
										<FormControl.ErrorMessage _text={{ fontSize: 'xs' }} key={errorMessage}>{errorMessage}</FormControl.ErrorMessage>
									))}
							</FormControl>
							<FormControl isRequired isInvalid={isFieldInError('password')}>
								<FormControl.Label
									_text={{
										color: 'coolGray.800',
										fontSize: 'xs',
										fontWeight: 500,
									}}>
									Password
								</FormControl.Label>
								<Input type="password" onChangeText={(password) => setPassword(password)} />
								<Link onPress={() => navigation.navigate('PasswordOlvidadoScreen')}
									_text={{ fontSize: 'xs', fontWeight: '500', color: 'indigo.500' }}
									alignSelf="flex-end"
									mt="1">
									¿Olvido su contraseña?
								</Link>
								{isFieldInError('password') &&
									getErrorsInField('password').map(errorMessage => (
										<FormControl.ErrorMessage _text={{ fontSize: 'xs' }} key={errorMessage}>
											{errorMessage}
										</FormControl.ErrorMessage>
									))}
							</FormControl>
							<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()} >
								Iniciar sesion
							</Button>
							<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => facebookSignIn()} >
								Iniciar sesion con Facebook
							</Button>
							<HStack mt="6" justifyContent="center">
								<Text fontSize="sm" color="muted.700" fontWeight={400}>
									¿Usuario nuevo?{' '}
								</Text>
								<Link onPress={() => navigation.navigate('RegisterScreen')}
									_text={{
										color: 'indigo.500',
										fontWeight: 'medium',
										fontSize: 'sm',
									}}
								>
									Registrate
								</Link>
							</HStack>
						</VStack>
					</Box>
				</ScrollView>
			}
		</NativeBaseProvider>
	);
}

LoginScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
};

const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
