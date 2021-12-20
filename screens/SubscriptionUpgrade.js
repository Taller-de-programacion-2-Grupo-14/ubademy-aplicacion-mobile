import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Spinner,
	Badge,
	Button,
	Center,
	PresenceTransition,
	Modal,
	VStack,
	HStack,
	Text,
	FormControl,
	Radio,
	Container,
	ScrollView
} from 'native-base';
import PropTypes from 'prop-types';
import { obtenerUsuario } from '../src/services/obtenerUsuario';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { changeSubscription } from '../src/services/paymentsService';

export default function SubscriptionUpgradeScreen({ navigation }) {
	const [subscripcion, setSubscripcion] = React.useState('');
	const [loading, setLoading] = React.useState(true);
	const [isOpen, setIsOpen] = React.useState(false);
	const isFocused = useIsFocused();
	const [showModal, setShowModal] = React.useState(false);
	const [mensaje, setMensaje] = React.useState('');
	const [groupValue, setGroupValue] = React.useState('basico');

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			obtenerUsuario()
				.then((response) => response.json())
				.then((json) => {
					console.log(json);
					if (json.subscription === 'free') {
						console.log('es free entonces le pongo basico');
						setSubscripcion('Basica');
					}
					if (json.subscription === 'platinum') {
						console.log('es platinum entonces le pongo estandard');
						setSubscripcion('Standard');
					}
					if (json.subscription === 'black') {
						console.log('es black entonces le pongo premium');
						setSubscripcion('Premium');
					}
					setLoading(false);
				})
				.catch((error) => {
					setLoading(false);
					console.error(error);
				});
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [isFocused])
	);

	this.changeUserSubscription = () => {
		console.log('cambiar subscripcion');
		console.log(groupValue);
		changeSubscription(groupValue).then((response) => response.json())
			.then((json) => {
				console.log(json);
				if (json.status === 200) {
					console.log(json.txn);
					setMensaje('Cambio de subscripcion solicitada con exito');
					setShowModal(true);
					setLoading(false);
				} else if (json.status === 400) {
					setMensaje('Algo salio mal. Intente mas tarde');
					setLoading(false);
					setShowModal(true);
				} else if (json.status === 401) {
					setMensaje('Algo salio mal. Intente mas tarde');
					console.log('Token invalido');
					setLoading(false);
					setShowModal(true);
				} else if (json.status === 402) {
					setMensaje('Usted no posee el saldo suficiente para realizar la transaccion');
					console.log('Token invalido');
					setLoading(false);
					setShowModal(true);
				} else if (json.status === 403) {
					setMensaje('Algo salio mal. Intente mas tarde');
					console.log('Token no provisto');
					setLoading(false);
					setShowModal(true);
				} else if (json.status === 500) {
					setMensaje('No se pudo generar la transaccion');
					setLoading(false);
					setShowModal(true);
				} else {
					setMensaje('Error. Intente mas tarde');
					setLoading(false);
					setShowModal(true);
					console.log('error');
				}
			})
			.catch((error) => {
				setLoading(false);
				console.error(error);
			});
	};

	return (

		<NativeBaseProvider>
			<Box flex={1} bg="white" alignItems="center" justifyContent="center">
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
								onPress={() => {
									setShowModal(false);
									navigation.goBack();
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
						<Box safeArea flex={8} p="2" py="8" w="90%" mx="auto" style={{ justifyContent: 'center' }}>
							<ScrollView
								_contentContainerStyle={{
									px: '20px',
									mb: '4',
								}}
							>
								<Container>
									<VStack space={3} w="100%">
										<FormControl>
											<HStack alignItems="flex-end">
												<Heading>Mi subscripcion <Badge colorScheme="success"> {subscripcion}</Badge></Heading>
											</HStack>
											<Radio.Group
												name="subscriptionGroup"
												accessibilityLabel="select subscription"
												defaultValue={groupValue}
												onChange={(value) => {
													setGroupValue(value || '');
												}}
											>
												<HStack alignItems="center" justifyContent="space-between">
													<Radio value="basico" my="1">
														Basico
													</Radio>
													<Text color="blueGray.400">Gratis</Text>
												</HStack>
												<HStack alignItems="center" justifyContent="space-between">
													<Radio value="estandar" my="1">
														Standard
													</Radio>
													<Text color="blueGray.400">$0.0001</Text>
												</HStack>
												<HStack alignItems="center" justifyContent="space-between">
													<Radio value="premium" my="1">
														Premium
													</Radio>
													<Text color="emerald.600">$0.0002</Text>
												</HStack>
											</Radio.Group>
										</FormControl>
										<PresenceTransition
											visible={isOpen}
											initial={{
												opacity: 0,
											}}
											animate={{
												opacity: 1,
												transition: {
													duration: 250,
												},
											}}
										>
											<Center
												mt="7"
												bg="teal.500"
												rounded="md"
												w="100%"
												h="100"
												_text={{
													color: 'white',
												}}
											>
												Al cambiar su subscripcion podra acceder a una mayor cantidad de cursos
												<Button colorScheme="indigo"
													flex="1"
													onPress={() => {
														console.log('Acepto');
														this.changeUserSubscription();
													}}
												>
													Acepto
												</Button>
											</Center>
										</PresenceTransition>
										<Button onPress={() => setIsOpen(!isOpen)}>
											{isOpen ? 'Cancelar' : 'Upgrade'}
										</Button>
									</VStack>
								</Container>
							</ScrollView>
						</Box>
				}
			</Box >
		</NativeBaseProvider >
	);
}

SubscriptionUpgradeScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
		goBack: PropTypes.func,
	}).isRequired,
	route: PropTypes.object
};

const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
