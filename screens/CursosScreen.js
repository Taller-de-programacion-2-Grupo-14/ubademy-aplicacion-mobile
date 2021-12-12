import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CrearCursoScreen from './CrearCursoScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InscribirmeScreen from './InscribirmeScreen';
import FavoritosScreen from './FavoritosScreen';
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
import ABcolaboradorScreen from './ABcolaboradorScreen';
import CrearExamenScreen from './CrearExamenScreen';
import ResolverExamenScreen from './ResolverExamenScreen';
import VerExamenScreen from './VerExamenScreen';
import ExamenesScreen from './ExamenesScreen';
import CorregirExamenScreen from './CorregirExamenScreen';
import {
	NativeBaseProvider
} from 'native-base';

const Stack = createNativeStackNavigator();

export function CursosScreen() {
	return (
		<NativeBaseProvider>
			<Stack.Navigator initialRouteName="MisCursosScreen">
				<Stack.Screen name="MisCursosScreen" component={MisCursosScreen} options={{ headerShown: false }} />
				<Stack.Screen name="MisCursosCreadosScreen" component={MisCursosCreadosScreen} options={{ headerShown: false }} />
				<Stack.Screen name="MiCursoCreadoScreen" component={MiCursoCreadoScreen} options={{ headerShown: false }} />
				<Stack.Screen name="MisCursosInscriptosScreen" component={MisCursosInscriptosScreen} options={{ headerShown: false }} />
				<Stack.Screen name="MiCursoInscriptoScreen" component={MiCursoInscriptoScreen} options={{ headerShown: false }} />
				<Stack.Screen name="MisColaboracionesScreen" component={MisColaboracionesScreen} options={{ headerShown: false }} />
				<Stack.Screen name="MiCursoColaboradorScreen" component={MiCursoColaboradorScreen} options={{ headerShown: false }} />
				<Stack.Screen name="EdicionCursoScreen" component={EdicionCursoScreen} options={{ headerShown: false }} />
				<Stack.Screen name="ListadoAlumnosScreen" component={ListadoAlumnosScreen} options={{ headerShown: false }} />
				<Stack.Screen name="ListadoProfesoresScreen" component={ListadoProfesoresScreen} options={{ headerShown: false }} />
				<Stack.Screen name="ABcolaboradorScreen" component={ABcolaboradorScreen} options={{ headerShown: false }} />
				<Stack.Screen name="CrearExamenScreen" component={CrearExamenScreen} options={{ headerShown: false }} />
				<Stack.Screen name="ResolverExamenScreen" component={ResolverExamenScreen} options={{ headerShown: false }} />
				<Stack.Screen name="VerExamenScreen" component={VerExamenScreen} options={{ headerShown: false }} />
				<Stack.Screen name="ExamenesScreen" component={ExamenesScreen} options={{ headerShown: false }} />
				<Stack.Screen name="CorregirExamenScreen" component={CorregirExamenScreen} options={{ headerShown: false }} />
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
			<Drawer.Screen name="Cursos favoritos" component={FavoritosScreen} />
		</Drawer.Navigator>
	);
}
