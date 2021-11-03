import React from 'react';
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
