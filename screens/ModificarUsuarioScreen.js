import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdateUsuarioScreen from './UpdateUsuarioScreen';
import LocationUUScreen from './LocationUUScreen';
import {
	NativeBaseProvider
} from 'native-base';

const Stack = createNativeStackNavigator();

export default function UsuariosScreen() {
	return (
		<NativeBaseProvider>
			<Stack.Navigator initialRouteName="UpdateUsuarioScreen">
				<Stack.Screen name="UpdateUsuarioScreen" component={UpdateUsuarioScreen} options={{ headerShown: false }} />
				<Stack.Screen name="LocationUUScreen" component={LocationUUScreen} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NativeBaseProvider>
	);
}
