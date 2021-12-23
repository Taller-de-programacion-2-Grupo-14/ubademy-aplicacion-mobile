import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Spinner,
	Modal,
	VStack,
	HStack,
	Text,
	Button,
	FormControl,
	Input,
	FlatList,
	Divider
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { editarExamen } from '../src/services/editarExamen';
import PropTypes from 'prop-types';

EditarExamenScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function EditarExamenScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [showModal, setShowModal] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const [inputs, setInputs] = React.useState([{key: '', value: ''}]);
	let preguntas = [];

	const inputHandler = (text, key)=>{
		const _inputs = [...inputs];
		_inputs[key].value = text;
		_inputs[key].key   = key;
		setInputs(_inputs);
	};

	const renderItem = ({ index }) => (
		<>
			<FormControl>
				<FormControl.Label>Pregunta:</FormControl.Label>
				<Input onChangeText={(text)=>inputHandler(text,index)} placeholder={route.params.preguntas[index]} multiline={true} />
			</FormControl>
			<Divider my="5" />
		</>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			const _inputs = [...inputs];
			for (var i = 1; i < route.params.preguntas.length; i++) {
				_inputs.push({key: '', value: ''});
				setInputs(_inputs);
			}
			setLoading(false);
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);

	this.onSubmit = () => {
		editarExamen(String(route.params.id_course), route.params.title, preguntas)
			.then((response) => response.json())
			.then((json) => {
				if (json.status === 200) {
					setShowModal(true);
					setMessage('¡Datos actualizados!');
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
					<>
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
						<Box safeArea flex={1} p="2" w="90%" mx="auto" >
							<Heading size="xl" color="coolGray.800" fontWeight="600" bold>
								Editar exámen
							</Heading>
							<Heading size="lg" color="coolGray.800" fontWeight="600" bold>
								{route.params.title}
							</Heading>
							<VStack space={3} mt="5">
								<FlatList
									data={route.params.preguntas}
									renderItem={renderItem}
									keyExtractor={(item, index) => index.toString()}
								/>
								<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }}
									onPress={() => {
										preguntas = inputs.map(function (obj) {
											return obj.value;
										});
										for (var i = 0; i < route.params.preguntas.length; i++) {
											if (preguntas[i]==''){
												preguntas[i] = route.params.preguntas[i];
											}
										}
										this.onSubmit();
									}} >
									Confirmar
								</Button>
							</VStack>
						</Box>
					</>
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

export default EditarExamenScreen;
