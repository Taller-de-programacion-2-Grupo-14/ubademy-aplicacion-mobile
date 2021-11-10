import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
	NativeBaseProvider,
	Pressable,
	Menu,
	Box,
	HStack,
	VStack,
	Modal,
	Text,
	Button,
	Heading,
	ScrollView,
	Spinner
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { desinscripcionCurso } from '../src/services/desinscripcionCurso';

MiCursoInscriptoScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function MiCursoInscriptoScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [showModal, setShowModal] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);

	const desinscribirse = () =>
		Alert.alert(
			'Desinscripción',
			'Ya no podrá rendir exámenes ni ver el contenido del curso.\n¿Está seguro que desea desinscribirse de este curso?',
			[
				{
					text: 'Cancelar',
					style: 'cancel'
				},
				{ text: 'OK', style: 'destructive',
					onPress: () => {
						desinscripcionCurso(route.params.course_name)
							.then((response) => response.json())
							.then((json) => {
								if (json.status === 200) {
									setMessage('Desincripción exitosa');
									setShowModal(true);
								} else {
									setError(true);
									setMessage('Error al desinscribirse');
									setShowModal(true);
								}
							});
					}
				}
			]
		);

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
											error ? setShowModal(false) : navigation.navigate('MisCursosScreen');
										}}
									>
										Continuar
									</Button>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
						<Box style={{top: 20, alignItems: 'flex-end'}}>
							<Menu
								w="190"
								trigger={(triggerProps) => {
									return (
										<Pressable accessibilityLabel="More options menu" {...triggerProps} >
											<Icon name="more-vert" size={35} />
										</Pressable>
									);
								}}
							>
								<Menu.Item onPress={desinscribirse} >Desinscripción del curso</Menu.Item>
								<Menu.Item onPress={() => {navigation.navigate('MisCursosScreen');}} >Salir del curso</Menu.Item>
							</Menu>
						</Box>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<Heading size="xl" color="coolGray.800" fontWeight="600">
								{ route.params.course_name }
							</Heading>
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

export default MiCursoInscriptoScreen;
