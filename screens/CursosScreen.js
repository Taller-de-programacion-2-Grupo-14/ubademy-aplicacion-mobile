import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CrearCursoScreen from './CrearCursoScreen';
import InscribirmeScreen from './InscribirmeScreen';
import SerColaboradorScreen from './SerColaboradorScreen';
import {
	NativeBaseProvider,
	Box,

	Heading,



	ScrollView,
	Spinner,
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

CursosHome.propTypes = {
	navigation: PropTypes.object.isRequired,
};

function CursosHome({ navigation }) {
	const [loading, setLoading] = React.useState(true);

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
								Por ahora nada
							</Heading>
						</Box>
					</ScrollView>
			}
		</NativeBaseProvider >
	);
}

const Drawer = createDrawerNavigator();

export default function CursosApp() {
	return (
		<Drawer.Navigator initialRouteName="CursosHome">
			<Drawer.Screen name="Mis cursos" component={CursosHome} />
			<Drawer.Screen name="Inscribirme a un curso" component={InscribirmeScreen} />
			<Drawer.Screen name="Crear un curso" component={CrearCursoScreen} />
			<Drawer.Screen name="Ser colaborador de un curso" component={SerColaboradorScreen} />
		</Drawer.Navigator>
	);
}

const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
