import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SubscriptionUpgrade from './SubscriptionUpgrade';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

function HomeScreenStack() {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Subscripcion" component={SubscriptionUpgrade} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}

export default HomeScreenStack;
