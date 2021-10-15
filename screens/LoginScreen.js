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
	Modal
} from 'native-base';

export default function LoginScreen({ navigation }) {
	const [user, setUser] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [showModal, setShowModal] = React.useState(false);
	this.onSubmit = () => {
		login(user, password)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				if (json.status === 200) {
					SecureStore.setItemAsync('secure_token', json.token);
					console.log(json.token);
					navigation.navigate('HomeScreen');
				} else {
					setShowModal(true);
					console.log('email o contrasenia invalidos');
				}

			})
			.catch((error) => {
				console.error(error);
			});

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
							onPress={() => {setShowModal(false);}}
						>
              Continuar
						</Button>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
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
					<FormControl>
						<FormControl.Label
							_text={{
								color: 'coolGray.800',
								fontSize: 'xs',
								fontWeight: 500,
							}}>
              Email
						</FormControl.Label>
						<Input onChangeText={(user) => setUser(user)} />
					</FormControl>
					<FormControl>
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
					</FormControl>
					<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()} >
            Iniciar sesion
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
		</NativeBaseProvider>
	);
}

LoginScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
};

