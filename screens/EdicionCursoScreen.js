import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	ScrollView,
	Text,
	Input,
	Spinner,
	FormControl,
	HStack,
	VStack,
	Modal,
	Button
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { editarCurso } from '../src/services/editarCurso';

EdicionCursoScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function EdicionCursoScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [showModal, setShowModal] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const [titulo, setTitulo] = React.useState('');
	const [descripcion, setDescripcion] = React.useState('');
	const [hashtags, setHashtags] = React.useState('');
	const [location, setLocation] = React.useState('');

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			setTitulo(route.params.name);
			setDescripcion(route.params.description);
			setHashtags(route.params.hashtags);
			setLocation(route.params.location);
			setLoading(false);
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);

	this.onSubmit = () => {
		editarCurso(String(route.params.id), titulo, descripcion, hashtags, location)
			.then((response) => response.json())
			.then((json) => {
				if (json.status === 200) {
					setShowModal(true);
					setMessage('Datos actualizados');
				} else {
					setError(true);
					setShowModal(true);
					setMessage('Ha ocurrido un error');
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
											setShowModal(false);
											if (!error) navigation.goBack();
										}}
									>
                    Continuar
									</Button>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<Heading size="lg" color="coolGray.800" fontWeight="600">
                Editar curso
							</Heading>
							<VStack space={3} mt="5">
								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                    Titulo
									</FormControl.Label>
									<Input onChangeText={(titulo) => setTitulo(titulo)} value={titulo} />
								</FormControl>

								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                    Descripcion
									</FormControl.Label>
									<Input onChangeText={(descripcion) => setDescripcion(descripcion)} value={descripcion} />
								</FormControl>

								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                    Hashtags asociados
									</FormControl.Label>
									<Input onChangeText={(hashtags) => setHashtags(hashtags)} value={hashtags} />
								</FormControl>

								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                    Ubicacion
									</FormControl.Label>
									<Input onChangeText={(location) => setLocation(location)} value={location} />
								</FormControl>

								<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()} >
                  Confirmar
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

export default EdicionCursoScreen;
