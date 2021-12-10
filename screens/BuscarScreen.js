import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Select,
	Input,
	FormControl,
	CheckIcon,
	Button,
	VStack,
	ScrollView,
	Spinner
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
	const busqueda = {tipo:'', suscripcion:'', textoLibre:''};

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
										<Select.Item label="Matemática" value="Matematica" />
										<Select.Item label="Programación" value="Programacion" />
										<Select.Item label="Cocina" value="Cocina" />
										<Select.Item label="Jardinería" value="Jardineria" />
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
										<Select.Item label="Básico" value="Basico" />
										<Select.Item label="Estándar" value="Estandar" />
										<Select.Item label="Premium" value="Premium" />
									</Select>
								</FormControl>

								<FormControl>
									<FormControl.Label>Filtrar por texto libre</FormControl.Label>
									<Input onChangeText={(textoLibre) => setTextoLibre(textoLibre)} value={textoLibre} />
								</FormControl>
							</VStack>
							<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }}
								onPress={() => {
									busqueda.tipo = tipo;
									busqueda.suscripcion = suscripcion;
									busqueda.textoLibre = textoLibre;
									navigation.navigate('ElegirCursoScreen', busqueda);}} >
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
