import React from 'react';
import { recuperoPassword } from '../src/services/recuperoPassword';
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
	Center,
	Image,
	Modal
} from 'native-base';

export default function RecuperoPasswordScreen({ navigation }) {
	const [token, setToken] = React.useState('');
	const [newPassword, setNewPassword] = React.useState('');
	const [showModal, setShowModal] = React.useState(false);
	const [modalMessage, setModalMessage] = React.useState('');
	const [showModalError, setShowModalError] = React.useState(false);
	this.onSubmit = () => {
		recuperoPassword(token, newPassword)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				if (json.status === 200) {
					console.log('Contrasenia modificada correctamente');
					setShowModal(true);
					setModalMessage('Password actualizado');
				} else {
					setShowModalError(true);
					if (json.status === 'failed') {
						setModalMessage('El password debe tener al menos 8 caracteres');
					} else {
						setModalMessage('Token invalido');
					}
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return (
		<NativeBaseProvider>
			<Box flex={1} bg="white" >
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
									navigation.navigate('LoginScreen');
								}}
							>
								Continuar
							</Button>
						</Modal.Footer>
					</Modal.Content>
				</Modal>

				<Modal isOpen={showModalError} onClose={() => setShowModalError(false)} size="lg">
					<Modal.Content maxWidth="350">
						<Modal.Body>
							<VStack space={3}>
								<HStack alignItems="center" justifyContent="space-between">
									<Text fontWeight="medium">{modalMessage}</Text>
								</HStack>
							</VStack>
						</Modal.Body>
						<Modal.Footer>
							<Button colorScheme="red"
								flex="1"
								onPress={() => { setShowModalError(false); }}
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
						Recupero de contrase??a
					</Heading>

					<VStack space={3} mt="5">
						<FormControl>
							<FormControl.Label
								_text={{
									color: 'coolGray.800',
									fontSize: 'xs',
									fontWeight: 500,
								}}>
								Ingrese el token que se le ha enviado por mail
							</FormControl.Label>
							<Input onChangeText={(token) => setToken(token)} />
						</FormControl>

						<FormControl>
							<FormControl.Label
								_text={{
									color: 'coolGray.800',
									fontSize: 'xs',
									fontWeight: 500,
								}}>
								Ingrese el nuevo password
							</FormControl.Label>
							<Input onChangeText={(newPassword) => setNewPassword(newPassword)} />
						</FormControl>

						<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()} >
							Continuar
						</Button>
					</VStack>
				</Box>
			</Box>
		</NativeBaseProvider>
	);
}

RecuperoPasswordScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
};