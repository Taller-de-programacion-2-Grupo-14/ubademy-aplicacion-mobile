import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	ScrollView,
	Spinner,
	VStack,
	HStack,
	FormControl,
	Input,
	Button,
	Modal,
	Text
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { completarExamen } from '../src/services/completarExamen';
import PropTypes from 'prop-types';

ResolverExamenScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function ResolverExamenScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [respuesta, setRespuesta] = React.useState('');
	const [respuestas, setRespuestas] = React.useState([]);
	const [showModal, setShowModal] = React.useState(false);
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
		setRespuestas([respuesta]);
		completarExamen(String(route.params.id), route.params.questions, respuestas)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				if (json.status === 200) {
					setMessage('¡Examen enviado correctamente!');
				} else {
					setError(true);
					setMessage('Error en el enviado del exámen');
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
							<VStack space={3} mt="5">
								<Heading size="xl" color="coolGray.800" fontWeight="600" bold>
									Resolver Examen
								</Heading>
								<Heading size="lg" color="coolGray.800" fontWeight="600">
									{route.params.questions[0]}
								</Heading>
								<FormControl>
									<FormControl.Label>Respuesta:</FormControl.Label>
									<Input onChangeText={(respuesta) => setRespuesta(respuesta)} value={respuesta} multiline={true} />
								</FormControl>
								<Button isDisabled={route.params.verComoCreador ? true : false} mt="2" colorScheme="indigo" _text={{ color: 'white' }}  onPress={() => this.onSubmit()}>
                  Terminar examen
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

export default ResolverExamenScreen;
