import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CrearCursoScreen from './CrearCursoScreen';
import LocationUUScreen from './LocationUUScreen';
import {
	NativeBaseProvider
} from 'native-base';

const Stack = createNativeStackNavigator();

export default function UsuariosScreen() {
	return (
		<NativeBaseProvider>
			<Stack.Navigator initialRouteName="CrearCursoScreen">
				<Stack.Screen name="CrearCursoScreen" component={CrearCursoScreen} options={{ headerShown: false }} />
				<Stack.Screen name="LocationUUScreen" component={LocationUUScreen} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NativeBaseProvider>
	);
}
