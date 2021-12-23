import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
	NativeBaseProvider,
	Box,
	Text,
	Heading,
	FormControl,
	Button,
	ScrollView,
	Spinner,
	Avatar,
	Stack,
	VStack,
	HStack,
	Modal,
	Center
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerUsuarioConEmail } from '../src/services/obtenerUsuario';
import PropTypes from 'prop-types';

export default function ViewProfileScreen({ navigation, route }) {
	const [firstName, setFirstName] = React.useState('');
	const [lastName, setLastName] = React.useState('');
	const [location, setLocation] = React.useState('');
	const [interest, setInetrests] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [loading, setLoading] = React.useState(true);
	const [photo_url, setPhoto_url] = React.useState('');
	const isFocused = useIsFocused();
	const [showModal, setShowModal] = React.useState(false);
	const [mensaje, setMensaje] = React.useState('');

	useFocusEffect(
		React.useCallback(() => {
			if (route.params?.email) {
				console.log(route);
				console.log(route.params.email);
				console.log('en viewProfileScreen');
				obtenerUsuarioConEmail(route.params.email)
					.then((response) => response.json())
					.then((json) => {
						console.log(json);
						console.log(json);
						setFirstName(json.first_name);
						setLastName(json.last_name);
						setEmail(json.email);
						setInetrests(json.interest);
						setLocation(json.location);
						setPhoto_url(json.photo_url);
						setLoading(false);
					})
					.catch((error) => {
						setLoading(false);
						setMensaje('Ha ocurrido un error');
						console.error(error);
					});
			}
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [isFocused])
	);
	return (

		<NativeBaseProvider>

			<Center flex={1} >
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
				{loading ?
					<View style={spinnerStyles.spinnerStyle}>
						<Spinner color="indigo.500" size="lg" />
					</View> :

					<Box bg="#fff" p="2" mt="3" mb="3">
						<ScrollView
							_contentContainerStyle={{
								px: '20px',
								mb: '4',
							}}
						>
							<Stack space={4}>
								<Box>
									{console.log(photo_url)
									}
									{(photo_url === '' || photo_url === null || photo_url == 'undefined') ?
										< Avatar
											bg="indigo.600"
											alignSelf="center"
											size="2xl"
										>
											{firstName.charAt(0).toUpperCase()}
										</Avatar>
										:
										<Avatar
											alignSelf="center"
											size="2xl"
											source={{ uri: photo_url }}
										>
										</Avatar>
									}
								</Box>
								<Stack space={2}>
									<Heading size="md" ml="-1">
										Datos del usuario
									</Heading>
								</Stack>
								<Stack alignItems="center" space={4} justifyContent="space-between">

									<FormControl>
										<FormControl.Label
											_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
											Email
										</FormControl.Label>
										<Text fontSize="sm" > {email} </Text>
									</FormControl>
									<FormControl>
										<FormControl.Label
											_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
											Nombre
										</FormControl.Label>
										<Text fontSize="sm"> {firstName} </Text>
									</FormControl>
									<FormControl>
										<FormControl.Label
											_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
											Apellido
										</FormControl.Label>
										<Text fontSize="sm" > {lastName} </Text>
									</FormControl>

									<FormControl>
										<FormControl.Label
											_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
											Ubicacion
										</FormControl.Label>
										<Text fontSize="sm" > {location} </Text>
									</FormControl>

									<FormControl>
										<FormControl.Label
											_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
											Tipo de curso de mayor interes
										</FormControl.Label>
										<Text fontSize="sm" > {interest} </Text>
									</FormControl>
								</Stack>
							</Stack>
							<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => navigation.goBack()} >
								Volver
							</Button>
						</ScrollView>
					</Box>
				}
			</Center>
		</NativeBaseProvider >
	);
}

const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

ViewProfileScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
		goBack: PropTypes.func,
	}).isRequired,
	route: PropTypes.object
};