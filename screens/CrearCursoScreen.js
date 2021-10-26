import React from 'react';
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

CrearCursoScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
};

function CrearCursoScreen({ navigation }) {
	const [loading, setLoading] = React.useState(true);
	const [titulo, setTitulo] = React.useState('');
	const [descripcion, setDescripcion] = React.useState('');
	const [hashtags, setHashtags] = React.useState('');
	const [tipo, setTipo] = React.useState('');
	const [examenes, setExamenes] = React.useState('');
	const [suscripcion, setSuscripcion] = React.useState('');
	const [location, setLocation] = React.useState('');
	const [otros, setOtros] = React.useState([]);

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
										<Select.Item label="Tipo de suscripción 1" value="tipo1" />
										<Select.Item label="Tipo de suscripción 2" value="tipo2" />
										<Select.Item label="Tipo de suscripción 3" value="tipo3" />
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

								<FormControl isRequired>
									<FormControl.Label
										_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
										Otros
									</FormControl.Label>
									<Input onChangeText={(otros) => setOtros(otros)} />
								</FormControl>

								<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} >
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

export default CrearCursoScreen;
