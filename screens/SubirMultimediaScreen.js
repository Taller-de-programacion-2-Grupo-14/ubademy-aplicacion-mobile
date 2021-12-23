import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	ScrollView,
	Spinner,
	Image,
	Button,
	FormControl,
	Input,
	Modal,
	VStack,
	HStack,
	Text
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { subirMultimedia } from '../src/services/subirMultimedia';

SubirMultimediaScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function SubirMultimediaScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [image, setImage] = React.useState(null);
	const [imagenSubida, setImagenSubida] = React.useState(null);
	const [pickerResult, setPickerResult] = React.useState(null);
	const [titulo, setTitulo] = React.useState('');
	const [showModal, setShowModal] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const d = new Date();
	let tipoDeArchivo = '';

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
			if (result.type=='video') {
				tipoDeArchivo = 'video';
			} else {
				tipoDeArchivo = 'image';
			}
			console.log(tipoDeArchivo);
		}
	};

	const subirFoto = async () => {
		handleImagePicked(pickerResult);
	};

	const handleImagePicked = async (pR) => {
		try {
			if (!pR.cancelled) {
				const uploadUrl = await uploadImageAsync(pR.uri);
				setImagenSubida(uploadUrl);
			}
		} catch (e) {
			console.log(e);
			Alert.alert('Error', 'No se ha podido subir el contenido multimedia');
		} finally {
			Alert.alert('Ok', '¡Contenido multimedia subido con éxito!');
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

		const fileRef = ref(getStorage(), `imagenes/multimedia/${String(d.getFullYear())+String(d.getMonth())+String(d.getFullYear())+String(d.getMonth())+String(d.getFullYear())+String(d.getMonth())+String(d.getMilliseconds())}`);
		const result = await uploadBytes(fileRef, blob);
		console.log(result);

		// We're done with the blob, close and release it
		blob.close();
		return await getDownloadURL(fileRef);
	}

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
		console.log(tipoDeArchivo);
		subirMultimedia(String(route.params.id), titulo, imagenSubida, tipoDeArchivo)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				if (json.status === 200) {
					setMessage('¡Guardado exitoso!');
				} else {
					setError(true);
					setMessage('Error en el guardado del contenido');
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
							<Heading size="xl" color="coolGray.800" fontWeight="600" bold>
								Subir contenido multimedia
							</Heading>
							<FormControl isRequired >
								<FormControl.Label
									_text={{ color: 'muted.700', fontSize: 'lg', fontWeight: 500 }}>
                  Ingrese el título del contenido
								</FormControl.Label>
								<Input onChangeText={(titulo) => setTitulo(titulo)} />
							</FormControl>
							<Icon
								type="material-community"
								name="camera-alt"
								//containerStyle={{alignItems: 'center', justifyContent: 'center', marginRight: 10, height: 70, width: 70, backgroundColor: '#E25542'}}
								size={50}
								color="#7A7A7A"
								onPress= {pickImage}
								//style= {{marginTop: -10}}
							/>
							{image && <Image source={{ uri: image }} key={image} style={{ width: 200, height: 200 }} alt="Logo" />}
							<Button isDisabled={(image==null)} mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={subirFoto} >
                Subir contenido
							</Button>

							<Button isDisabled={(imagenSubida==null)} mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()} >
                Guardar
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

export default SubirMultimediaScreen;
