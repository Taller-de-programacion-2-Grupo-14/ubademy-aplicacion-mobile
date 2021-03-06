import React from 'react';
import { crearCurso } from '../src/services/crearCurso';
import { useIsFocused } from '@react-navigation/native';
import { View, StyleSheet, Alert } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Text,
	Heading,
	VStack,
	FormControl,
	Input,
	Button,
	HStack,
	Modal,
	ScrollView,
	Spinner,
	Select,
	CheckIcon,
	WarningOutlineIcon,
	TextArea,
	Image
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useValidation } from 'react-native-form-validator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function CrearCursoScreen({ navigation }) {
	const [loading, setLoading] = React.useState(true);
	const [titulo, setTitulo] = React.useState('');
	const [descripcion, setDescripcion] = React.useState('');
	const [hashtags, setHashtags] = React.useState('');
	const [tipo, setTipo] = React.useState('');
	const [examenes, setExamenes] = React.useState('');
	const [suscripcion, setSuscripcion] = React.useState('');
	const [location, setLocation] = React.useState('');
	const [error, setError] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [showModal, setShowModal] = React.useState(false);
	const isFocused = useIsFocused();
	const [image, setImage] = React.useState(null);
	const [imagenSubida, setImagenSubida] = React.useState('https://firebasestorage.googleapis.com/v0/b/uba-demy.appspot.com/o/imagenes%2Fbanners%2Fgenerica.jpeg?alt=media&token=a62d3455-4a3c-4ca3-ab19-4df2d63c2ce9');
	const [pickerResult, setPickerResult] = React.useState(null);
	const [esUnVideo, setEsUnVideo] = React.useState(false);
	const d = new Date();

	const { validate, isFieldInError, getErrorsInField, isFormValid } =
		useValidation({
			state: { titulo, descripcion, hashtags, tipo, examenes, suscripcion, location },
			deviceLocale: 'es',
			labels: {
				titulo: 'Titulo',
				descripcion: 'Descripci??n',
				hashtags: 'Hashtags',
				tipo: 'Tipo',
				examenes: 'Examenes',
				suscripcion: 'Subscripci??n',
				location: 'Ubicaci??n'
			}
		});

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
			if (result.type == 'video') {
				setEsUnVideo(true);
			} else {
				setEsUnVideo(false);
			}
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
			Alert.alert('Error', 'No se ha podido subir la imagen');
		} finally {
			Alert.alert('Ok', '??Imagen subida con ??xito!');
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

		const fileRef = ref(getStorage(), `imagenes/banners/${String(d.getFullYear()) + String(d.getMonth()) + String(d.getFullYear()) + String(d.getMonth()) + String(d.getFullYear()) + String(d.getMonth()) + String(d.getMilliseconds())}`);
		const result = await uploadBytes(fileRef, blob);
		console.log(result);

		// We're done with the blob, close and release it
		blob.close();
		return await getDownloadURL(fileRef);
	}

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			setTitulo('');
			setDescripcion('');
			setHashtags('');
			setTipo('');
			setExamenes('');
			setSuscripcion('');
			setLocation('');
			setImage(null);
			setImagenSubida('https://firebasestorage.googleapis.com/v0/b/uba-demy.appspot.com/o/imagenes%2Fbanners%2Fgenerica.jpeg?alt=media&token=a62d3455-4a3c-4ca3-ab19-4df2d63c2ce9');
			setPickerResult(null);
			setLoading(false);
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [isFocused])
	);

	this.onSubmit = () => {
		validate({
			titulo: { required: true },
			descripcion: { required: true },
			hashtags: { required: true },
			tipo: { required: true },
			examenes: { numbers: true, required: true },
			location: { required: true },
			suscripcion: { required: true },
		});
		if (isFormValid() == true) {
			console.log(imagenSubida);
			if (imagenSubida === null) {
				setImagenSubida('https://firebasestorage.googleapis.com/v0/b/uba-demy.appspot.com/o/imagenes%2Fbanners%2Fgenerica.jpeg?alt=media&token=a62d3455-4a3c-4ca3-ab19-4df2d63c2ce9');
			}
			console.log(imagenSubida);
			crearCurso(titulo, descripcion, hashtags, tipo, examenes, suscripcion, location, imagenSubida)
				.then((response) => response.json())
				.then((json) => {
					console.log('creando curso');
					console.log(json);
					if (json.status === 200) {
						setMessage('Curso creado exitosamente');
						setShowModal(true);
					} else {
						setError(true);
						setMessage('Error al crear el curso');
						setShowModal(true);
					}
				});
		}
	};

	return (

		<NativeBaseProvider>
			<Box flex={1} bg="white">
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
							<Box safeArea bg="white" flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
								<Heading size="sm" color="coolGray.800" fontWeight="600">
									Complete los siguientes datos para crear un curso
								</Heading>
								<VStack space={3} mt="5">
									<FormControl isRequired isInvalid={isFieldInError('titulo')}>
										<FormControl.Label
											_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
											T??tulo
										</FormControl.Label>
										<Input onChangeText={(titulo) => setTitulo(titulo)} value={titulo} />
										{isFieldInError('titulo') &&
											getErrorsInField('titulo').map(errorMessage => (
												<FormControl.ErrorMessage _text={{ fontSize: 'xs' }} key={errorMessage}>{errorMessage}</FormControl.ErrorMessage>
											))}
									</FormControl>

									<FormControl isRequired isInvalid={isFieldInError('descripcion')}>
										<FormControl.Label
											_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
											Descripci??n
										</FormControl.Label>
										<TextArea onChangeText={(descripcion) => setDescripcion(descripcion)} value={descripcion}
											h={20}
											placeholder="Descripci??n"
											w={{
												base: '100%',
												md: '25%',
											}}
										/>
										{isFieldInError('descripcion') &&
											getErrorsInField('descripcion').map(errorMessage => (
												<FormControl.ErrorMessage _text={{ fontSize: 'xs' }} key={errorMessage}>{errorMessage}</FormControl.ErrorMessage>
											))}
									</FormControl>

									<FormControl isRequired isInvalid={isFieldInError('hashtags')}>
										<FormControl.Label
											_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
											Hashtags asociados (ingrese las palabras separadas por una coma)
										</FormControl.Label>
										<Input onChangeText={(hashtags) => setHashtags(hashtags)} value={hashtags} />
										{isFieldInError('hashtags') &&
											getErrorsInField('hashtags').map(errorMessage => (
												<FormControl.ErrorMessage _text={{ fontSize: 'xs' }} key={errorMessage}>{errorMessage}</FormControl.ErrorMessage>
											))}
									</FormControl>

									<FormControl isRequired isInvalid={isFieldInError('tipo')}>
										<FormControl.Label
											_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
											Tipo de curso</FormControl.Label>
										<Select
											selectedValue={tipo}
											minWidth="200"
											accessibilityLabel="Elegir un tipo de curso"
											placeholder="Elegir un tipo de curso"
											_selectedItem={{
												bg: 'teal.600',
												endIcon: <CheckIcon size="5" />,
											}}
											mt={1}
											onValueChange={(tipo) => setTipo(tipo)}
										>
											<Select.Item label="Matem??tica" value="Matematica" />
											<Select.Item label="Programaci??n" value="Programacion" />
											<Select.Item label="Cocina" value="Cocina" />
											<Select.Item label="Jardiner??a" value="Jardineria" />
											<Select.Item label="Otro" value="Otro" />
										</Select>
										<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
											Seleccionar uno
										</FormControl.ErrorMessage>
										{isFieldInError('tipo') &&
											getErrorsInField('tipo').map(errorMessage => (
												<FormControl.ErrorMessage _text={{ fontSize: 'xs' }} key={errorMessage}>{errorMessage}</FormControl.ErrorMessage>
											))}
									</FormControl>

									<FormControl isRequired isInvalid={isFieldInError('examenes')}>
										<FormControl.Label
											_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
											Cantidad de ex??menes
										</FormControl.Label>
										<Input onChangeText={(examenes) => setExamenes(examenes)} value={examenes} />
										{isFieldInError('examenes') &&
											getErrorsInField('examenes').map(errorMessage => (
												<FormControl.ErrorMessage _text={{ fontSize: 'xs' }} key={errorMessage}>{errorMessage}</FormControl.ErrorMessage>
											))}
									</FormControl>

									<FormControl isRequired isInvalid={isFieldInError('suscripcion')}>
										<FormControl.Label
											_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
											Tipo de suscripci??n</FormControl.Label>
										<Select
											selectedValue={suscripcion}
											minWidth="200"
											accessibilityLabel="Elegir suscripci??n"
											placeholder="Elegir suscripci??n"
											_selectedItem={{
												bg: 'teal.600',
												endIcon: <CheckIcon size="5" />,
											}}
											mt={1}
											onValueChange={(suscripcion) => setSuscripcion(suscripcion)}
										>
											<Select.Item label="B??sico" value="Basico" />
											<Select.Item label="Est??ndar" value="Estandar" />
											<Select.Item label="Premium" value="Premium" />
										</Select>
										{isFieldInError('suscripcion') &&
											getErrorsInField('suscripcion').map(errorMessage => (
												<FormControl.ErrorMessage _text={{ fontSize: 'xs' }} key={errorMessage}>{errorMessage}</FormControl.ErrorMessage>
											))}
										<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
											Seleccionar uno
										</FormControl.ErrorMessage>
									</FormControl>

									<FormControl isRequired isInvalid={isFieldInError('location')}>
										<FormControl.Label
											_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
											Ubicaci??n
										</FormControl.Label>
										<Input onChangeText={(location) => setLocation(location)} value={location} />
										{isFieldInError('location') &&
											getErrorsInField('location').map(errorMessage => (
												<FormControl.ErrorMessage _text={{ fontSize: 'xs' }} key={errorMessage}>{errorMessage}</FormControl.ErrorMessage>
											))}
									</FormControl>

									<Icon
										type="material-community"
										name="camera-alt"
										//containerStyle={{alignItems: 'center', justifyContent: 'center', marginRight: 10, height: 70, width: 70, backgroundColor: '#E25542'}}
										size={50}
										color="#7A7A7A"
										onPress={pickImage}
										style={{ alignSelf: 'center' }}
									/>

									{image && <Image source={{ uri: image }} key={image} style={{ width: 300, height: 225, alignSelf: 'center' }} alt="Logo" />}

									<Button isDisabled={(image == null) || (esUnVideo)} mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={subirFoto} >
										Subir banner del curso
									</Button>
									{
										esUnVideo ?
											<Text color={!esUnVideo ? 'transparent' : '#EB0202'} style={{ textAlign: 'center' }}>
												El banner no puede ser un video
											</Text> :
											null
									}

									<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()} >
										Crear curso
									</Button>
								</VStack>
							</Box>
						</ScrollView>
				}
			</Box>
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

CrearCursoScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
		goBack: PropTypes.func,
	}).isRequired
};
