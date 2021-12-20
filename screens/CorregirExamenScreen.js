import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Spinner,
	FlatList,
	Divider,
	FormControl,
	Input,
	Button,
	Modal,
	VStack,
	HStack,
	Text,
	Select,
	CheckIcon,
	WarningOutlineIcon
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { enviarCorreccion } from '../src/services/enviarCorreccion';
import PropTypes from 'prop-types';

CorregirExamenScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function CorregirExamenScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [preguntas, setPreguntas] = React.useState([]);
	const [respuestas, setRespuestas] = React.useState([]);
	const [observaciones, setObservaciones] = React.useState('');
	const [showModal, setShowModal] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const [nota, setNota] = React.useState('');
	const [corregido, setCorregido] = React.useState(false);
	const [estado, setEstado] = React.useState('');

	const renderItem = ({ item, index }) => (
		<>
			<Heading size="lg" color="coolGray.800" fontWeight="600" bold>
				Pregunta:
			</Heading>
			<Heading size="lg" color="coolGray.800" fontWeight="600" >
				{item}
			</Heading>
			<Heading size="lg" color="coolGray.800" fontWeight="600" bold>
				Respuesta:
			</Heading>
			<Heading size="lg" color="coolGray.800" fontWeight="600" >
				{respuestas[index]}
			</Heading>
			<Divider my="5" />
		</>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			if (route.params.status == 'nc'){
				setCorregido(false);
			} else {
				setCorregido(true);
			}

			if (route.params.status == 'fail'){
				setEstado('Desaprobado');
			} else {
				if (route.params.status == 'pass') {
					setEstado('Aprobado');
				}
			}

			setPreguntas(route.params.questions);
			setRespuestas(route.params.answer);
			setLoading(false);
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);

	this.onSubmit = () => {
		enviarCorreccion(String(route.params.user), String(route.params.course), nota, observaciones, route.params.exam)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				if (json.status === 200) {
					setMessage('¡Corrección enviada!');
				} else {
					setError(true);
					setMessage('Error en el envio de la corrección');
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
								{route.params.exam}
							</Heading>
							<Heading size="lg" color="coolGray.800" fontWeight="600" bold>
								ID del estudiante: {route.params.user}
							</Heading>
							<Box safeArea flex={1} w="95%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
								<FlatList
									data={preguntas}
									//extraData={respuestas}
									renderItem={renderItem}
									keyExtractor={(item, index) => index.toString()}
								/>
							</Box>

							{corregido ?
								<Heading size="lg" color="coolGray.800" fontWeight="600" bold>
									Nota:
								</Heading>
								:
								null
							}
							{corregido ?
								<Heading size="lg" color="coolGray.800" fontWeight="600" >
									{estado}
								</Heading>
								:
								null
							}
							{corregido ?
								<Heading size="lg" color="coolGray.800" fontWeight="600" bold>
									Observaciones:
								</Heading>
								:
								null
							}
							{corregido ?
								<Heading size="lg" color="coolGray.800" fontWeight="600" >
									{route.params.correction}
								</Heading>
								:
								null
							}

							{!corregido ?
								<FormControl isRequired>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
										Nota</FormControl.Label>
									<Select
										selectedValue={nota}
										minWidth="200"
										accessibilityLabel="Aprobado / Desaprobado"
										placeholder="Aprobado / Desaprobado"
										_selectedItem={{
											bg: 'teal.600',
											endIcon: <CheckIcon size="5" />,
										}}
										mt={1}
										onValueChange={(nota) => setNota(nota)}
									>
										<Select.Item label="Aprobado" value="aprobado" />
										<Select.Item label="Desaprobado" value="desaprobado" />
									</Select>
									<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
										Seleccionar uno
									</FormControl.ErrorMessage>
								</FormControl>
								:
								null
							}
							{!corregido ?
								<FormControl isRequired>
									<FormControl.Label>Observaciones:</FormControl.Label>
									<Input onChangeText={(observaciones) => setObservaciones(observaciones)} value={observaciones} multiline={true} />
								</FormControl> :
								null
							}

							<Button isDisabled={corregido} mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()}>
								Terminar corrección
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

export default CorregirExamenScreen;
