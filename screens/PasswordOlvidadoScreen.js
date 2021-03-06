import React from 'react';
import { password } from '../src/services/password';
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

export default function PasswordOlvidadoScreen({ navigation }) {
	const [mail, setMail] = React.useState('');
	const [showModal, setShowModal] = React.useState(false);
	const [modalMessage, setModalMessage] = React.useState('');
	this.onSubmit = () => {
		password(mail)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				if (json.status === 200) {
					navigation.navigate('RecuperoPasswordScreen');
				} else {
					setShowModal(true);
					setModalMessage('Email no registrado');
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
							<Button colorScheme="red"
								flex="1"
								onPress={() => { setShowModal(false); }}
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
						Ingrese el email con el que se registró
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
							<Input onChangeText={(mail) => setMail(mail)} />
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

PasswordOlvidadoScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
};
