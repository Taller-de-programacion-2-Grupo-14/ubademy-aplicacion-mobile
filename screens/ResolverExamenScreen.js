import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Spinner,
	VStack,
	HStack,
	FormControl,
	Input,
	Button,
	Modal,
	Text,
	FlatList,
	Divider
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { completarExamen } from '../src/services/completarExamen';
import PropTypes from 'prop-types';

ResolverExamenScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function ResolverExamenScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [showModal, setShowModal] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const [inputs, setInputs] = React.useState([{key: '', value: ''}]);
	let respuestas = [];

	const inputHandler = (text, key)=>{
		const _inputs = [...inputs];
		_inputs[key].value = text;
		_inputs[key].key   = key;
		setInputs(_inputs);
	};

	const renderItem = ({ item, index }) => (
		<>
			<Heading size="lg" color="coolGray.800" fontWeight="600" >
				{item}
			</Heading>
			<FormControl>
				<FormControl.Label>Respuesta:</FormControl.Label>
				<Input onChangeText={(text)=>inputHandler(text,index)} multiline={true} />
			</FormControl>
			<Divider my="5" />
		</>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			const _inputs = [...inputs];
			for (var i = 1; i < route.params.questions.length; i++) {
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
		completarExamen(String(route.params.course_id), route.params.questions, respuestas, route.params.title)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				if (json.status === 200) {
					setMessage('¡Exámen enviado correctamente!');
				} else {
					setError(true);
					setMessage('Error en el enviado del exámen');
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
								Resolver Examen
							</Heading>
							<Box safeArea flex={1} w="95%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
								<FlatList
									data={route.params.questions}
									renderItem={renderItem}
									keyExtractor={(item, index) => index.toString()}
								/>
							</Box>
							<Button isDisabled={route.params.verComoCreador ? true : false} mt="2" colorScheme="indigo" _text={{ color: 'white' }}
								onPress={() => {
									respuestas = inputs.map(function (obj) {
										return obj.value;
									});
									this.onSubmit();
								}}>
								Terminar examen
							</Button>
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

export default ResolverExamenScreen;
