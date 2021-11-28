import React from 'react';
import {
	NativeBaseProvider,
} from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CursosFavoritosScreen from './CursosFavoritosScreen';
import MiCursoFavoritoScreen from './MiCursoFavoritoScreen';

const Stack = createNativeStackNavigator();

function FavoritosScreen() {
	return (
		<NativeBaseProvider>
			<Stack.Navigator initialRouteName="CursosFavoritosScreen">
				<Stack.Screen name="CursosFavoritosScreen" component={CursosFavoritosScreen} options={{ headerShown: false }} />
				<Stack.Screen name="MiCursoFavoritoScreen" component={MiCursoFavoritoScreen} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NativeBaseProvider>
	);
}

export default FavoritosScreen;
