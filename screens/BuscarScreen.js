import React from 'react';
import { buscarCurso } from '../src/services/buscarCurso';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	FormControl,
	Input,
	Text,
	Button,
	VStack,
	HStack,
	ScrollView,
	Spinner,
	Modal
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

BuscarScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
};

function BuscarScreen({ navigation }) {
	const [loading, setLoading] = React.useState(true);
	const [busqueda, setBusqueda] = React.useState('');
	const [showModal, setShowModal] = React.useState(false);

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
		buscarCurso(busqueda)
			.then((response) => response.json())
			.then((json) => {
				if (json.status === 200) {
					navigation.navigate('ElegirCursoScreen');
				} else {
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
											<Text fontWeight="medium">Búsqueda sin resultados</Text>
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
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<Heading size="lg" color="coolGray.800" fontWeight="600">
								Buscar un curso
							</Heading>
							<VStack space={3} mt="5">
								<FormControl>
									<Input onChangeText={(busqueda) => setBusqueda(busqueda)} />
								</FormControl>
							</VStack>
							<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()} >
								Buscar
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

export default BuscarScreen;
