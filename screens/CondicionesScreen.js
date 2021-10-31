import React from 'react';
import { elegirCurso } from '../src/services/elegirCurso';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Button,
	Heading,
	Text,
	HStack,
	VStack,
	Modal,
	ScrollView,
	Spinner
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

CondicionesScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
};

function CondicionesScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [cursoElegido, setCursoElegido] = React.useState('');
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
		elegirCurso(cursoElegido)
			.then((response) => response.json())
			.then((json) => {
				if (json.status === 200) {
					setMessage('¡Inscripción exitosa!');
					setShowModal(true);
				} else {
					setError(true);
					setMessage('Error al inscribirse');
					setShowModal(true);
				}
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
											error ? setShowModal(false) : navigation.navigate('HomeScreen');
										}}
									>
										Continuar
									</Button>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<Heading size="xl" color="coolGray.800" fontWeight="600" >
								{ route.params.course_name }
							</Heading>
							<Heading size="lg" color="coolGray.800" fontWeight="600">
								{'\n'}Condiciones de la inscripción
							</Heading>
							<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={(cursoElegido) => setCursoElegido(cursoElegido), () => this.onSubmit()} >
		            Confirmar inscripción
							</Button>
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

export default CondicionesScreen;
