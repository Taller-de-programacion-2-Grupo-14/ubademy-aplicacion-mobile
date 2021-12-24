import React from 'react';
import { elegirCurso } from '../src/services/elegirCurso';
//import { obtenerCurso } from '../src/services/obtenerCurso';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Pressable,
	Box,
	Button,
	Heading,
	Text,
	FormControl,
	HStack,
	VStack,
	Modal,
	ScrollView,
	Spinner
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { agregarAFavoritos } from '../src/services/agregarAFavoritos';
import { eliminarDeFavoritos } from '../src/services/eliminarDeFavoritos';

MiCursoFavoritoScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function MiCursoFavoritoScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [showModal, setShowModal] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const [favorito, setFavorito] = React.useState(true);
	// const [descripcion, setDescripcion] = React.useState('');
	// const [hashtags, setHashtags] = React.useState('');
	// const [examenes, setExamenes] = React.useState('');
	// const [tipoDeCurso, setTipoDeCurso] = React.useState('');
	// const [location, setLocation] = React.useState('');

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			// obtenerCurso(route.params.id)
			// 	.then(data => data.json())
			// 	.then(json => {
			setLoading(false);
			// 		setDescripcion(json.description);
			// 		setHashtags(json.hashtags);
			// 		setExamenes(String(json.exams));
			// 		setTipoDeCurso(json.type);
			// 		setLocation(json.location);
			// 	});
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);

	this.onSubmit = () => {
		elegirCurso(route.params.id)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				if (json.status === 200) {
					setMessage('¡Inscripción exitosa!');
					setShowModal(true);
				} else {
					if (json.status === 403) {
						setError(true);
						setMessage('Debe subir su nivel de suscripción');
						setShowModal(true);
					} else {
						setError(true);
						setMessage('Error al inscribirse');
						setShowModal(true);
					}
				}
			});
	};

	this.corazon = () => {
		if (favorito) {
			eliminarDeFavoritos(route.params.id);
			setFavorito(false);
		} else {
			agregarAFavoritos(route.params.id);
			setFavorito(true);
		}
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
											error ? setShowModal(false) : navigation.navigate('CursosFavoritosScreen');
										}}
									>
										Continuar
									</Button>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
						<Box style={{top: 20, alignItems: 'flex-end'}}>
							<Pressable onPress={() => this.corazon()} >
								<Icon name={favorito ? 'favorite' : 'favorite-border'} size={35} color={favorito ? 'red' : 'black'} />
							</Pressable>
						</Box>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<Heading size="xl" color="coolGray.800" fontWeight="600" bold >
								{ route.params.name }
							</Heading>
							<Heading size="lg" color="coolGray.800" fontWeight="600">
								{'\n'}Condiciones de la inscripción
							</Heading>

							<VStack space={3} mt="5">
								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
										Creador del curso:
									</FormControl.Label>
									<Text fontSize="sm" > { route.params.creator_first_name } { route.params.creator_last_name } </Text>
								</FormControl>
								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
										Descripción:
									</FormControl.Label>
									<Text fontSize="sm" > { route.params.description } </Text>
								</FormControl>
								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
										Hashtags:
									</FormControl.Label>
									<Text fontSize="sm"> { route.params.hashtags } </Text>
								</FormControl>
								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
										Tipo de curso:
									</FormControl.Label>
									<Text fontSize="sm" > { route.params.type } </Text>
								</FormControl>
								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
										Cantidad de exámenes:
									</FormControl.Label>
									<Text fontSize="sm" > { route.params.exams } </Text>
								</FormControl>
								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
										Tipo de suscripción:
									</FormControl.Label>
									<Text fontSize="sm" > {(route.params.subscription=='basico' || route.params.subscription=='básico' || route.params.subscription=='Basico') ? 'Básico' :
										((route.params.subscription=='estandar' || route.params.subscription=='estándar' || route.params.subscription=='Estandar') ? 'Estándar' : 'Premium')
									} </Text>
								</FormControl>
								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
										Ubicación:
									</FormControl.Label>
									<Text fontSize="sm" > { route.params.location } </Text>
								</FormControl>
							</VStack>
							<Button mt="2" isDisabled={!route.params.can_subscribe} colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()} >
								Confirmar inscripción
							</Button>
							<Text color={route.params.can_subscribe ? 'transparent' : '#EB0202'} style={{textAlign: 'center'}}> {route.params.is_subscribed ? 'Usted ya está inscripto' :
								route.params.can_edit ? 'Usted es el creador' : 'No tiene el nivel de suscrcripción adecuado'
							}
							</Text>
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

export default MiCursoFavoritoScreen;
