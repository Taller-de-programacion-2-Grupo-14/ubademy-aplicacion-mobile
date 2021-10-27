import React from 'react';
import { crearCurso } from '../src/services/crearCurso';
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
	WarningOutlineIcon
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

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
										error ? setShowModal(false) : navigation.goBack();
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
									Titulo
								</FormControl.Label>
								<Input onChangeText={(titulo) => setTitulo(titulo)} />
							</FormControl>

							<FormControl isRequired>
								<FormControl.Label
									_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
									Descripcion
								</FormControl.Label>
								<Input onChangeText={(descripcion) => setDescripcion(descripcion)} />
							</FormControl>

							<FormControl isRequired>
								<FormControl.Label
									_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
									Hashtags asociados
								</FormControl.Label>
								<Input onChangeText={(hashtags) => setHashtags(hashtags)} />
							</FormControl>

							<FormControl isRequired>
								<FormControl.Label>Tipo de curso</FormControl.Label>
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
									<Select.Item label="Matemática" value="matematica" />
									<Select.Item label="Programación" value="programacion" />
									<Select.Item label="Cocina" value="cocina" />
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
								<FormControl.Label>Tipo de suscripción</FormControl.Label>
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
									<Select.Item label="Básico" value="suscripcion1" />
									<Select.Item label="Estándar" value="suscripcion2" />
									<Select.Item label="Premium" value="suscripcion3" />
								</Select>
								<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
									Seleccionar uno
								</FormControl.ErrorMessage>
							</FormControl>

							<FormControl isRequired>
								<FormControl.Label
									_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
									Ubicacion
								</FormControl.Label>
								<Input onChangeText={(location) => setLocation(location)} />
							</FormControl>

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
