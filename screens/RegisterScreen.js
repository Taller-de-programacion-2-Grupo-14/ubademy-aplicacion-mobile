import React from 'react';
import { register } from '../src/services/register';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import {
	NativeBaseProvider,
	Box,
	Text,
	Heading,
	VStack,
	FormControl,
	Input,
	Button,
	Select,
	CheckIcon,
	WarningOutlineIcon,
	Checkbox,
	HStack,
	Center,
	ScrollView,
	Image,
	Modal
} from 'native-base';
import { useValidation } from 'react-native-form-validator';
import * as Location from 'expo-location';


export default function RegisterScreen({ navigation }) {
	const [mail, setMail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [passwordR, setPasswordR] = React.useState('');
	const [name, setName] = React.useState('');
	const [lastName, setLastName] = React.useState('');
	const [perfil, setPerfil] = React.useState('');
	const [interests, setInterests] = React.useState([]);
	const [showModal, setShowModal] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const [location, setLocation] = React.useState('Waiting..');
	const [errorMsg, setErrorMsg] = React.useState(null);


	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			(async () => {
				const { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== 'granted') {
					setErrorMsg('Permission to access location was denied');
					return;
				}

				const location = await Location.getCurrentPositionAsync({});
				const latLong = {
					longitude: location.coords.longitude,
					latitude: location.coords.latitude
				};
				const stringLocation = Location.reverseGeocodeAsync(latLong);
				//setLocation(stringLocation[0].city);
				if (errorMsg) {
					setLocation(errorMsg);
				} else {
					setLocation(JSON.stringify(location));
				}
				console.log(stringLocation);
				console.log(errorMsg);
			})();
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);

	const { validate, isFieldInError, getErrorsInField } =
		useValidation({
			state: { mail, password, passwordR, name, lastName, location },
			deviceLocale: 'es'
		});

	this.handleSubmit = () => {
		validate({
			mail: { email: true, required: true },
			password: { minlength: 3, maxlength: 9, required: true },
			passwordR: { minlength: 3, maxlength: 9, required: true, equalPassword: password },
			name: { minlength: 1, maxlength: 30, required: true },
			lastName: { minlength: 1, maxlength: 30, required: true },
			location: { required: true },
		});
		register(mail, password, name, lastName, perfil, location, interests)
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
			<ScrollView
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
						<FormControl>
							<FormControl.Label>Perfil</FormControl.Label>
							<Select
								selectedValue={perfil}
								minWidth="200"
								accessibilityLabel="Elegir Perfil"
								placeholder="Elegir Perfil"
								_selectedItem={{
									bg: 'teal.600',
									endIcon: <CheckIcon size="5" />,
								}}
								mt={1}
								onValueChange={(perfil) => setPerfil(perfil)}
							>
								<Select.Item label="Estudiante" value="Student" />
								<Select.Item label="Creador" value="Creator" />
								<Select.Item label="Colaborador" value="Collaborator" />
							</Select>
							<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
								Seleccionar uno
							</FormControl.ErrorMessage>
						</FormControl>
						<FormControl >
							<FormControl.Label>Intereses</FormControl.Label>
							<VStack space={2}>
								<VStack>
									<Box>
										<Text>Seleccionados: ({interests.length})</Text>
									</Box>
								</VStack>
								<Checkbox.Group
									colorScheme="green"
									defaultValue={interests}
									accessibilityLabel="pick an item"
									onChange={(interests) => {
										setInterests(interests || []);
									}}
								>
									<Checkbox value="Matematica" my="1">
										Matematica
									</Checkbox>
									<Checkbox value="Programacion" my="1">
										Programacion
									</Checkbox>
									<Checkbox value="Cocina" my="1">
										Cocina
									</Checkbox>
									<Checkbox value="Jardineria" my="1">
										Jardineria
									</Checkbox>
								</Checkbox.Group>
							</VStack>
						</FormControl>
						<FormControl isRequired isInvalid={isFieldInError('location')}>
							<FormControl.Label
								_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
								Ubicacion
							</FormControl.Label>
							<Input onChangeText={(text) => setLocation(text)} />
							{isFieldInError('location') &&
								getErrorsInField('location').map(errorMessage => (
									<FormControl.ErrorMessage _text={{ fontSize: 'xs' }} key={errorMessage}>{errorMessage}</FormControl.ErrorMessage>
								))}
						</FormControl>
						<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.handleSubmit()} >
							Registrate
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
};
