import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CrearCursoScreen from './CrearCursoScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InscribirmeScreen from './InscribirmeScreen';
import SerColaboradorScreen from './SerColaboradorScreen';
import MisCursosScreen from './MisCursosScreen';
import MisCursosCreadosScreen from './MisCursosCreadosScreen';
import MiCursoCreadoScreen from './MiCursoCreadoScreen';
import MisCursosInscriptosScreen from './MisCursosInscriptosScreen';
import MiCursoInscriptoScreen from './MiCursoInscriptoScreen';
import {
	NativeBaseProvider
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

CursosScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
};

const Stack = createNativeStackNavigator();

export function CursosScreen({ navigation }) {
	return (
		<NativeBaseProvider>
			<Stack.Navigator initialRouteName="MisCursosScreen">
				<Stack.Screen name="MisCursosScreen" component={MisCursosScreen} options={{ headerShown: false }}/>
				<Stack.Screen name="MisCursosCreadosScreen" component={MisCursosCreadosScreen} options={{ headerShown: false }}/>
				<Stack.Screen name="MiCursoCreadoScreen" component={MiCursoCreadoScreen} options={{ headerShown: false }}/>
				<Stack.Screen name="MisCursosInscriptosScreen" component={MisCursosInscriptosScreen} options={{ headerShown: false }}/>
				<Stack.Screen name="MiCursoInscriptoScreen" component={MiCursoInscriptoScreen} options={{ headerShown: false }}/>
			</Stack.Navigator>
		</NativeBaseProvider>
	);
}

const Drawer = createDrawerNavigator();

export default function CursosApp() {
	return (
		<Drawer.Navigator initialRouteName="CursosScreen">
			<Drawer.Screen name="Mis cursos" component={CursosScreen} />
			<Drawer.Screen name="Inscribirme a un curso" component={InscribirmeScreen} />
			<Drawer.Screen name="Crear un curso" component={CrearCursoScreen} />
			<Drawer.Screen name="Ser colaborador de un curso" component={SerColaboradorScreen} />
		</Drawer.Navigator>
	);
}
