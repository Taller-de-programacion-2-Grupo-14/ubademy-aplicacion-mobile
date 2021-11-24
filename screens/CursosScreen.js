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
import EdicionCursoScreen from './EdicionCursoScreen';
import ListadoAlumnosScreen from './ListadoAlumnosScreen';
import ListadoProfesoresScreen from './ListadoProfesoresScreen';
import MisColaboracionesScreen from './MisColaboracionesScreen';
import MiCursoColaboradorScreen from './MiCursoColaboradorScreen';
import HistoricoDeCursosScreen from './HistoricoDeCursosScreen';
import {
	NativeBaseProvider
} from 'native-base';

const Stack = createNativeStackNavigator();

export function CursosScreen() {
	return (
		<NativeBaseProvider>
			<Stack.Navigator initialRouteName="MisCursosScreen">
				<Stack.Screen name="MisCursosScreen" component={MisCursosScreen} options={{ headerShown: false }}/>
				<Stack.Screen name="MisCursosCreadosScreen" component={MisCursosCreadosScreen} options={{ headerShown: false }}/>
				<Stack.Screen name="MiCursoCreadoScreen" component={MiCursoCreadoScreen} options={{ headerShown: false }}/>
				<Stack.Screen name="MisCursosInscriptosScreen" component={MisCursosInscriptosScreen} options={{ headerShown: false }}/>
				<Stack.Screen name="MiCursoInscriptoScreen" component={MiCursoInscriptoScreen} options={{ headerShown: false }}/>
				<Stack.Screen name="MisColaboracionesScreen" component={MisColaboracionesScreen} options={{ headerShown: false }}/>
				<Stack.Screen name="MiCursoColaboradorScreen" component={MiCursoColaboradorScreen} options={{ headerShown: false }}/>
				<Stack.Screen name="EdicionCursoScreen" component={EdicionCursoScreen} options={{ headerShown: false }}/>
				<Stack.Screen name="ListadoAlumnosScreen" component={ListadoAlumnosScreen} options={{ headerShown: false }}/>
				<Stack.Screen name="ListadoProfesoresScreen" component={ListadoProfesoresScreen} options={{ headerShown: false }}/>
			</Stack.Navigator>
		</NativeBaseProvider>
	);
}

const Drawer = createDrawerNavigator();

export default function CursosApp() {
	return (
		<Drawer.Navigator initialRouteName="CursosScreen">
			<Drawer.Screen name="Mis cursos" component={CursosScreen} />
			<Drawer.Screen name="Buscar un curso" component={InscribirmeScreen} />
			<Drawer.Screen name="Crear un curso" component={CrearCursoScreen} />
			<Drawer.Screen name="Histórico de cursos" component={HistoricoDeCursosScreen} />
			<Drawer.Screen name="Cursos favoritos" component={SerColaboradorScreen} />
		</Drawer.Navigator>
	);
}
