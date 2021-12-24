import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Text,
	VStack,
	FormControl,
	Link,
	Input,
	Button,
	HStack,
	Modal,
	ScrollView,
	Spinner,
	Avatar,
	Image
} from 'native-base';
import { editarUsuario } from '../src/services/editarUsuario';
import { obtenerUsuario } from '../src/services/obtenerUsuario';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

UpdateUsuarioScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object
};

function UpdateUsuarioScreen({ navigation, route }) {
	const [firstName, setFirstName] = React.useState('');
	const [lastName, setLastName] = React.useState('');
	const [location, setLocation] = React.useState('');
	const [interest, setInterests] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [showModal, setShowModal] = React.useState(false);
	const [modalMessage, setModalMessage] = React.useState('');
	const [loading, setLoading] = React.useState(true);
	const [photo_url, setPhoto_url] = React.useState('');
	const [image, setImage] = React.useState(null);
	const [imagenSubida, setImagenSubida] = React.useState('');
	const [pickerResult, setPickerResult] = React.useState(null);
	const d = new Date();

	let vengoDeUU = true;

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			if (route.params?.ubicacion) {
				const { ubicacion } = route.params;
				console.log(ubicacion);
				setLocation(ubicacion);
				console.log('en UpdateUsuarioScreen');
				console.log(location);
			}
			obtenerUsuario()
				.then(data => data.json())
				.then(json => {
					setLoading(false);
					console.log(json);
					setFirstName(json.first_name);
					setLastName(json.last_name);
					setEmail(json.email);
					if (!route.params?.ubicacion) {
						setLocation(json.location);
					}
					setPhoto_url(json.photo_url);
					setInterests(json.interest);

				});
			setImage(null);
			setImagenSubida('');
			setPickerResult(null);
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [route.params?.ubicacion])
	);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		console.log(result);
		if (!result.cancelled) {
			setImage(result.uri);
			setPickerResult(result);
			setPhoto_url(result.uri);
		}
	};


	async function uploadImageAsync(uri) {
		// Why are we using XMLHttpRequest? See:
		// https://github.com/expo/expo/issues/2402#issuecomment-443726662
		const blob = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.onerror = function (e) {
				console.log(e);
				reject(new TypeError('Network request failed'));
			};
			xhr.responseType = 'blob';
			xhr.open('GET', uri, true);
			xhr.send(null);
		});

		const fileRef = ref(getStorage(), `imagenes/profile/${String(d.getFullYear()) + String(d.getMonth()) + String(d.getFullYear()) + String(d.getMonth()) + String(d.getFullYear()) + String(d.getMonth()) + String(d.getMilliseconds())}`);
		const result = await uploadBytes(fileRef, blob);
		console.log(result);

		// We're done with the blob, close and release it
		blob.close();
		return await getDownloadURL(fileRef);
	}

	this.onSubmit = async () => {
		try {
			let uploadUrl = '';
			if (!pickerResult.cancelled) {
				uploadUrl = await uploadImageAsync(pickerResult.uri);
				setImagenSubida(uploadUrl);
				setPhoto_url(uploadUrl);
			}
			console.log(imagenSubida, 'imagen subida');
			console.log(uploadUrl, 'upload url');
			console.log(photo_url);
			editarUsuario(firstName, lastName, location, interest, email, uploadUrl)
				.then((response) => response.json())
				.then((json) => {
					console.log('editar usuario ');
					console.log(json);
					if (json.status === 200) {
						setShowModal(true);
						setModalMessage('Datos actualizados');
					} else {
						setShowModal(true);
						setModalMessage('Ha ocurrido un error');
					}
				});
		} catch (e) {
			console.log(e);
			setModalMessage('No se ha podido subir la imagen');
			Alert.alert('Error', 'No se ha podido subir la imagen');
		} finally {
			console.log('Imagen subida con éxito');
			Alert.alert('Ok', '¡Imagen subida con éxito!');
		}
	};

	return (

		<NativeBaseProvider>
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
								setShowModal(false);
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
					<ScrollView
						_contentContainerStyle={{
							px: '20px',
							mb: '4',
						}}
					>

						<Box safeArea flex={1} p="4" w="100%" mx="auto" py="8" style={{ justifyContent: 'center' }} mt="4" mb="4"
							bg="white"
							overflow="hidden"
							borderColor="coolGray.200"
							borderWidth="1"
							rounded="md">
							<VStack space={3} mt="3">
								<Box>
									<VStack>
										{(photo_url === '' || photo_url === null || photo_url == 'undefined') ?
											< Avatar
												bg="indigo.600"
												alignSelf="center"
												size="2xl"
											>
												{firstName.charAt(0).toUpperCase()}
											</Avatar>
											:
											<Avatar key={image}
												alignSelf="center"
												size="2xl"
												source={{ uri: photo_url }}
											>
											</Avatar>
										}

										<Link onPress={pickImage}
											_text={{ fontSize: 'xs', fontWeight: '500', color: 'indigo.500' }}
											alignSelf="flex-end"
											mt="1">
											Modificar mi foto
										</Link>

									</VStack>
								</Box>
								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 'bold' }}>
										Email
									</FormControl.Label>
									<Input onChangeText={(email) => setEmail(email)} value={email} />
								</FormControl>
								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 'bold' }}>
										Nombre
									</FormControl.Label>
									<Input onChangeText={(firstName) => setFirstName(firstName)} value={firstName} />
								</FormControl>
								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 'bold' }}>
										Apellido
									</FormControl.Label>
									<Input onChangeText={(lastName) => setLastName(lastName)} value={lastName} />
								</FormControl>

								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 'bold' }}>
										Ubicacion
									</FormControl.Label>
									<Input onChangeText={(location) => setLocation(location)} value={location} />
								</FormControl>

								<FormControl>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 'bold' }}>
										Tipo de curso de mayor interes
									</FormControl.Label>
									<Input onChangeText={(interest) => setInterests(interest)} value={interest} />
								</FormControl>
								<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()} >
									Confirmar
								</Button>
							</VStack>
						</Box>
					</ScrollView>
			}
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

export default UpdateUsuarioScreen;
