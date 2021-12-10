import React from 'react';
import { register } from '../src/services/register';
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
	Checkbox,
	HStack,
	Center,
	ScrollView,
	Image,
	Modal,
	Link
} from 'native-base';
import { useValidation } from 'react-native-form-validator';
import { useFocusEffect } from '@react-navigation/native';

export default function RegisterScreen({ navigation, route }) {
	const [mail, setMail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [passwordR, setPasswordR] = React.useState('');
	const [name, setName] = React.useState('');
	const [lastName, setLastName] = React.useState('');
	const [interests, setInterests] = React.useState([]);
	const [showModal, setShowModal] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const [location, setLocation] = React.useState('');

	const { validate, isFieldInError, getErrorsInField } =
		useValidation({
			state: { mail, password, passwordR, name, lastName, location },
			deviceLocale: 'es'
		});

	useFocusEffect(
		React.useCallback(() => {
			console.log('intento imprimir route');
			console.log(route);
			if (route.params?.ubicacion) {
				const { ubicacion } = route.params;
				console.log(ubicacion);
				setLocation(ubicacion);
				console.log('en register screen');
				console.log(location);
			}
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [route.params?.ubicacion])
	);

	this.handleSubmit = () => {
		validate({
			mail: { email: true, required: true },
			password: { minlength: 6, maxlength: 35, required: true },
			passwordR: { minlength: 6, maxlength: 35, required: true, equalPassword: password },
			name: { minlength: 1, maxlength: 30, required: true },
			lastName: { minlength: 1, maxlength: 30, required: true },
			location: { required: true },
		});
		register(mail, password, name, lastName, location, interests)
			.then((response) => {
				const json = response.json();
				console.log(json);
				if (response.status === 200) {
					setMessage('Registro Exitoso!');
					setShowModal(true);
					// login(mail, password)
					// 	.then((response) => response.json())
					// 	.then((json) => {
					// 		console.log(json);
					// 		if (json.status === 200) {
					// 			SecureStore.setItemAsync('secure_token', json.token);
					// 			console.log(json.token);

					// 		} else {
					// 			setMessage('email o contrasenia invalidos');
					// 			setError(true);
					// 			setShowModal(true);
					// 			console.log('email o contrasenia invalidos');
					// 		}

					// 	})
					// 	.catch((error) => {
					// 		console.error(error);
					// 	});
					// //navigation.navigate("LoginScreen")
				} else if (response.status == 400) {
					setMessage('Error al registrarse');
					setError(true);
					setShowModal(true);
					console.log('Bad Request');
				}

			})
			.catch((error) => {
				console.error(error);
			});

	};

	this.onRegionChange = (region) => {
		this.setState({ region });
	};

	this.getInitialState = () => {
		return {
			region: {
				latitude: 37.78825,
				longitude: -122.4324,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			},
		};
	};

	return (
		<NativeBaseProvider>
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
			<ScrollView keyboardShouldPersistTaps={'handled'}
				_contentContainerStyle={{
					px: '20px',
					mb: '4',
				}}
			>
				<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
					<Center>
						<Image
							source={require('../images/logo.png')}
							alt="Logo"
							size="xl"
						/>
					</Center>
					<Heading size="lg" color="coolGray.800" fontWeight="600">
						Bienvenido
					</Heading>
					<Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
						Registrate para continuar!
					</Heading>
					<VStack space={3} mt="5">
						<FormControl isRequired isInvalid={isFieldInError('mail')}>
							<FormControl.Label
								_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
								Email
							</FormControl.Label>
							<Input onChangeText={(mail) => setMail(mail)} />
							{isFieldInError('mail') &&
								getErrorsInField('mail').map(errorMessage => (
									<FormControl.ErrorMessage _text={{ fontSize: 'xs' }} key={errorMessage}>{errorMessage}</FormControl.ErrorMessage>
								))}
						</FormControl>

						<FormControl isRequired isInvalid={isFieldInError('password')}>
							<FormControl.Label
								_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
								Contraseña
							</FormControl.Label>
							<Input type="password" onChangeText={(password) => setPassword(password)} />
							{isFieldInError('password') &&
								getErrorsInField('password').map(errorMessage => (
									<FormControl.ErrorMessage _text={{ fontSize: 'xs' }} key={errorMessage}>{errorMessage}</FormControl.ErrorMessage>
								))}
						</FormControl>
						<FormControl isRequired isInvalid={isFieldInError('passwordR')}>
							<FormControl.Label
								_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
								Repita la contraseña
							</FormControl.Label>
							<Input type="password" onChangeText={(passwordR) => setPasswordR(passwordR)} />
							{isFieldInError('passwordR') &&
								getErrorsInField('passwordR').map(errorMessage => (
									<FormControl.ErrorMessage _text={{ fontSize: 'xs' }} key={errorMessage}>{errorMessage}</FormControl.ErrorMessage>
								))}

						</FormControl>

						<FormControl isRequired isInvalid={isFieldInError('name')}>
							<FormControl.Label
								_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
								Nombre
							</FormControl.Label>
							<Input onChangeText={(name) => setName(name)} />
							{isFieldInError('name') &&
								getErrorsInField('name').map(errorMessage => (
									<FormControl.ErrorMessage _text={{ fontSize: 'xs' }} key={errorMessage}>{errorMessage}</FormControl.ErrorMessage>
								))}
						</FormControl>
						<FormControl isRequired isInvalid={isFieldInError('lastName')}>
							<FormControl.Label
								_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
								Apellido
							</FormControl.Label>
							<Input onChangeText={(lastName) => setLastName(lastName)} />
							{isFieldInError('lastName') &&
								getErrorsInField('lastName').map(errorMessage => (
									<FormControl.ErrorMessage _text={{ fontSize: 'xs' }} key={errorMessage}>{errorMessage}</FormControl.ErrorMessage>
								))}
						</FormControl>
						<FormControl >
							<FormControl.Label>Intereses</FormControl.Label>
							<VStack space={2}>
								<VStack>
									<Box>
										<Text>Seleccionados: ({interests.length})</Text>
									</Box>
								</VStack>
								<ScrollView horizontal={true} keyboardShouldPersistTaps={'handled'}
									_contentContainerStyle={{
										px: '20px',
										mb: '4',
									}}
								>
									<Checkbox.Group
										colorScheme="green"
										defaultValue={interests}
										accessibilityLabel="pick an item"
										onChange={(interests) => {
											setInterests(interests || []);
										}}
									>
										<HStack>
											<Checkbox value="Matematica" my="1" mr="1">
												Ciencias
											</Checkbox>
											<Checkbox value="Programacion" my="1" mr="1">
												Programacion
											</Checkbox>
											<Checkbox value="Cocina" my="1" mr="1">
												Medicina
											</Checkbox>
											<Checkbox value="Deportes" my="1" mr="1">
												Deportes
											</Checkbox>
											<Checkbox value="Matematica" my="1" mr="1">
												Matematicas
											</Checkbox>
											<Checkbox value="Fisica" my="1" mr="1">
												Fisica
											</Checkbox>
										</HStack>
										<HStack>
											<Checkbox value="Marketing" my="1" mr="1">
												Marketing
											</Checkbox>
											<Checkbox value="Publicidad digital" my="1" mr="1">
												Publicidad digital
											</Checkbox>
											<Checkbox value="Criptomonedas" my="1" mr="1">
												Criptomonedas
											</Checkbox>
											<Checkbox value="Blockchain" my="1" mr="1">
												Blockchain
											</Checkbox>
											<Checkbox value="Idiomas" my="1" mr="1">
												Idiomas
											</Checkbox>
											<Checkbox value="Social media" my="1" mr="1">
												Social Media
											</Checkbox>
										</HStack>
										<HStack>
											<Checkbox value="Data science" my="1" mr="1">
												Data science
											</Checkbox>
											<Checkbox value="Diseño" my="1" mr="1">
												Diseño
											</Checkbox>
											<Checkbox value="Edición" my="1" mr="1">
												Medicina
											</Checkbox>
											<Checkbox value="Ventas online" my="1" mr="1">
												Ventas online
											</Checkbox>
											<Checkbox value="Gestión de proyectos" my="1" mr="1">
												Gestión de proyectos
											</Checkbox>
											<Checkbox value="Manualidades" my="1" mr="1">
												Manualidades
											</Checkbox>
										</HStack>
										<HStack>
											<Checkbox value="Arte" my="1" mr="1">
												Arte
											</Checkbox>
											<Checkbox value="Analytics" my="1" mr="1">
												Analytics
											</Checkbox>
											<Checkbox value="Meditacion" my="1" mr="1">
												Meditacion
											</Checkbox>
											<Checkbox value="Espiritualidad" my="1" mr="1">
												Espiritualidad
											</Checkbox>
											<Checkbox value="Matematica" my="1" mr="1">
												Ciencias
											</Checkbox>
											<Checkbox value="Atención online" my="1" mr="1">
												Atención online
											</Checkbox>
										</HStack>
									</Checkbox.Group>
								</ScrollView>
							</VStack>
						</FormControl>
						<FormControl isRequired isInvalid={isFieldInError('location')}>
							<FormControl.Label
								_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
								Ubicacion
							</FormControl.Label>
							<Input onChangeText={(location) => setLastName(location)} value={location} isDisabled />
							{isFieldInError('location') &&
								getErrorsInField('location').map(errorMessage => (
									<FormControl.ErrorMessage _text={{ fontSize: 'xs' }} key={errorMessage}>{errorMessage}</FormControl.ErrorMessage>
								))}
							<Link onPress={() => navigation.navigate('LocationScreen')}
								_text={{
									color: 'indigo.500',
									fontWeight: 'medium',
									fontSize: 'sm',
								}}
							>
								Seleccionar mi ubicacion
							</Link>
						</FormControl>
						<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.handleSubmit()} >
							Registrarme
						</Button>
					</VStack>
				</Box>
			</ScrollView>
		</NativeBaseProvider>
	);
}


RegisterScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
		goBack: PropTypes.func,
	}).isRequired,
	route: PropTypes.object
};
