import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SubscriptionUpgrade from './SubscriptionUpgrade';
import HomeScreen from './HomeScreen';
import {
	NativeBaseProvider
} from 'native-base';

const Stack = createNativeStackNavigator();

export default function BienvenidaScreen() {
	return (
		<NativeBaseProvider>
			<Stack.Navigator initialRouteName="HomeScreen">
				<Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
				<Stack.Screen name="Subscripcion" component={SubscriptionUpgrade} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NativeBaseProvider>
	);
}
