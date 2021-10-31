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
	ScrollView
} from 'native-base';
import { useValidation } from 'react-native-form-validator';
import { signInWithFacebook } from '../src/utils/auth';

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [showModal, setShowModal] = React.useState(false);
	const { validate, isFieldInError, getErrorsInField, isFormValid } =
		useValidation({
			state: { email, password },
			deviceLocale: 'es'
		});
	const facebook = () => {
		signInWithFacebook().then((response) => {
			console.log(response);

		});

	};
	this.onSubmit = () => {
		validate({
			email: { email: true, required: true },
			password: { minlength: 3, maxlength: 15, required: true },
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
					} else {
						setShowModal(true);
						console.log('email o contrasenia invalidos');
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
								<Text fontWeight="medium">Usuario o contraseña invalidos</Text>
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
						<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => facebook()} >
							Iniciar sesion con Facebook
						</Button>
						<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()} >
							Iniciar sesion con Google
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
		</NativeBaseProvider>
	);
}

LoginScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
};
