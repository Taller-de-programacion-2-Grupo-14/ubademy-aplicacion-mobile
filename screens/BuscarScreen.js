import React from 'react';
import { buscarCurso } from '../src/services/buscarCurso';
import { useIsFocused } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Select,
	Input,
	FormControl,
	Text,
	CheckIcon,
	Button,
	VStack,
	HStack,
	ScrollView,
	Spinner,
	Modal
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

BuscarScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
};

function BuscarScreen({ navigation }) {
	const [loading, setLoading] = React.useState(true);
	const [tipo, setTipo] = React.useState('');
	const [suscripcion, setSuscripcion] = React.useState('');
	const [textoLibre, setTextoLibre] = React.useState('');
	const [showModal, setShowModal] = React.useState(false);
	const isFocused = useIsFocused();

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
		buscarCurso(tipo, suscripcion, textoLibre)
			.then((response) => response.json())
			.then((json) => {
				if (json.status === 200) {
					navigation.navigate('ElegirCursoScreen');
				} else {
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
											<Text fontWeight="medium">Búsqueda sin resultados</Text>
										</HStack>
									</VStack>
								</Modal.Body>
								<Modal.Footer>
									<Button colorScheme="indigo"
										flex="1"
										onPress={() => { setShowModal(false); }}
									>
										Continuar
									</Button>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<Heading size="lg" color="coolGray.800" fontWeight="600">
								Busqueda de curso
							</Heading>
							<VStack space={3} mt="5">
								<FormControl>
									<FormControl.Label>Filtrar por tipo de curso</FormControl.Label>
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
										<Select.Item label="-" value="" />
										<Select.Item label="Matemática" value="matematica" />
										<Select.Item label="Programación" value="programacion" />
										<Select.Item label="Cocina" value="cocina" />
										<Select.Item label="Jardinería" value="jardineria" />
									</Select>
								</FormControl>

								<FormControl>
									<FormControl.Label>Filtrar por tipo de suscripción</FormControl.Label>
									<Select
										selectedValue={suscripcion}
										minWidth="200"
										accessibilityLabel="Elegir un tipo de suscripción"
										placeholder="Elegir un tipo de suscripción"
										_selectedItem={{
											bg: 'teal.600',
											endIcon: <CheckIcon size="5" />,
										}}
										mt={1}
										onValueChange={(suscripcion) => setSuscripcion(suscripcion)}
									>
										<Select.Item label="-" value="" />
										<Select.Item label="Básico" value="suscripcion1" />
										<Select.Item label="Estándar" value="suscripcion2" />
										<Select.Item label="Premium" value="suscripcion3" />
									</Select>
								</FormControl>

								<FormControl>
									<FormControl.Label>Filtrar por texto libre</FormControl.Label>
									<Input onChangeText={(textoLibre) => setTextoLibre(textoLibre)} value={textoLibre} />
								</FormControl>
							</VStack>
							<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()} >
								Buscar
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

export default BuscarScreen;
