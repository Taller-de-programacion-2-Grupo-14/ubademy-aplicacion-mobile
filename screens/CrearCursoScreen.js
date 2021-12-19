import React from 'react';
import { crearCurso } from '../src/services/crearCurso';
import { useIsFocused } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
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
	Image
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

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
	const [image, setImage] = useState(null);

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
		}
	};

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			setLoading(false);
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [isFocused])
	);

	this.onSubmit = () => {
		crearCurso(titulo, descripcion, hashtags, tipo, examenes, suscripcion, location)
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
								Complete los siguientes datos para crear un curso
							</Heading>
							<VStack space={3} mt="5">
								<FormControl isRequired>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
										Título
									</FormControl.Label>
									<Input onChangeText={(titulo) => setTitulo(titulo)} />
								</FormControl>

								<FormControl isRequired>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
										Descripción
									</FormControl.Label>
									<Input onChangeText={(descripcion) => setDescripcion(descripcion)} />
								</FormControl>

								<FormControl isRequired>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
										Hashtags asociados (ingrese las palabras separadas por una coma)
									</FormControl.Label>
									<Input onChangeText={(hashtags) => setHashtags(hashtags)} />
								</FormControl>

								<FormControl isRequired>
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
										<Select.Item label="Matemática" value="Matematica" />
										<Select.Item label="Programación" value="Programacion" />
										<Select.Item label="Cocina" value="Cocina" />
										<Select.Item label="Jardinería" value="Jardineria" />
									</Select>
									<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
										Seleccionar uno
									</FormControl.ErrorMessage>
								</FormControl>

								<FormControl isRequired>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
										Cantidad de exámenes
									</FormControl.Label>
									<Input onChangeText={(examenes) => setExamenes(examenes)} />
								</FormControl>

								<FormControl isRequired>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
										Tipo de suscripción</FormControl.Label>
									<Select
										selectedValue={suscripcion}
										minWidth="200"
										accessibilityLabel="Elegir suscripción"
										placeholder="Elegir suscripción"
										_selectedItem={{
											bg: 'teal.600',
											endIcon: <CheckIcon size="5" />,
										}}
										mt={1}
										onValueChange={(suscripcion) => setSuscripcion(suscripcion)}
									>
										<Select.Item label="Básico" value="Basico" />
										<Select.Item label="Estándar" value="Estandar" />
										<Select.Item label="Premium" value="Premium" />
									</Select>
									<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
										Seleccionar uno
									</FormControl.ErrorMessage>
								</FormControl>

								<FormControl isRequired>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
										Ubicación
									</FormControl.Label>
									<Input onChangeText={(location) => setLocation(location)} />
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

								{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} alt="Logo" />}

								<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()} >
									Crear curso
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

CrearCursoScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
		goBack: PropTypes.func,
	}).isRequired,
};
