import React from 'react';
import { StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BuscarScreen from './BuscarScreen';
import ElegirCursoScreen from './ElegirCursoScreen';
import CondicionesScreen from './CondicionesScreen';

InscribirmeScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
};

const Stack = createNativeStackNavigator();

function InscribirmeScreen({ navigation }) {
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
			<Stack.Navigator initialRouteName="BuscarScreen">
				<Stack.Screen name="BuscarScreen" component={BuscarScreen} options={{ headerShown: false }} />
				<Stack.Screen name="ElegirCursoScreen" component={ElegirCursoScreen} options={{ headerShown: false }} />
				<Stack.Screen name="CondicionesScreen" component={CondicionesScreen} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NativeBaseProvider>
	);
}

export default InscribirmeScreen;
