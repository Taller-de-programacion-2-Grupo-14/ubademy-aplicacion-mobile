import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	ScrollView,
	Spinner,
	FormControl,
	Input,
	VStack,
	HStack,
	Button,
	Modal,
	Text
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { crearExamen } from '../src/services/crearExamen';
import { useValidation } from 'react-native-form-validator';
import PropTypes from 'prop-types';

CrearExamenScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function CrearExamenScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [nombre, setNombre] = React.useState('');
	const [showModal, setShowModal] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const [inputs, setInputs] = React.useState([{key: '', value: ''}]);
	let preguntas = [];

	const { validate, isFieldInError, getErrorsInField, isFormValid } =
		useValidation({
			state: { nombre },
			deviceLocale: 'es',
			labels: {
				nombre: 'Nombre'
			}
		});

	const addHandler = ()=>{
		const _inputs = [...inputs];
		_inputs.push({key: '', value: ''});
		setInputs(_inputs);
	};

	// const deleteHandler = (key)=>{
	// 	const _inputs = inputs.filter((input,index) => index != key);
	// 	setInputs(_inputs);
	// };

	const inputHandler = (text, key)=>{
		const _inputs = [...inputs];
		_inputs[key].value = text;
		_inputs[key].key   = key;
		setInputs(_inputs);

	};

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
		validate({
			nombre: { minlength: 3, required: true },
		});

		if (isFormValid() == true) {
			crearExamen(String(route.params.id), nombre, preguntas)
				.then((response) => response.json())
				.then((json) => {
					console.log(json);
					if (json.status === 200) {
						setMessage('¡Creación exitosa!');
					} else {
						setError(true);
						setMessage('Error en la creación del exámen');
					}
					setShowModal(true);
				});
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
											error ? setShowModal(false) : navigation.goBack();
										}}
									>
                    Continuar
									</Button>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<VStack space={5}>
								<Heading size="xl" color="coolGray.800" fontWeight="600" bold>
									Crear exámen
								</Heading>

								<FormControl isRequired isInvalid={isFieldInError('nombre')}>
									<FormControl.Label>Ingrese el nombre del exámen</FormControl.Label>
									<Input size="md" onChangeText={(nombre) => setNombre(nombre)} value={nombre} multiline={true} />
									{isFieldInError('nombre') &&
										getErrorsInField('nombre').map(errorMessage => (
											<FormControl.ErrorMessage _text={{ fontSize: 'xs' }} key={errorMessage}>{errorMessage}</FormControl.ErrorMessage>
										))}
								</FormControl>

								{inputs.map((input, key)=>(
									<FormControl key={key}>
										<FormControl.Label>Ingrese la pregunta</FormControl.Label>
										<Input value={input.value} onChangeText={(text)=>inputHandler(text,key)} multiline={true}/>
									</FormControl>
								))}

								<Button isDisabled={!route.params.can_create_exams} mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={addHandler} >
                  Agregar pregunta
								</Button>
								<Button isDisabled={!route.params.can_create_exams} mt="2" colorScheme="indigo" _text={{ color: 'white' }}
									onPress={() => {
										preguntas = inputs.map(function (obj) {
											return obj.value;
										});
										this.onSubmit();
									}} >
                  Crear
								</Button>
								<Text color={route.params.can_create_exams ? 'transparent' : '#EB0202'} style={{textAlign: 'center'}}>
									Ha alcanzado el número máximo de exámenes para este curso
								</Text>
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

export default CrearExamenScreen;
