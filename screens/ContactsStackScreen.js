import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactsScreen from './ContactsScreen';
import ChatScreen from './ChatScreen';
import ViewProfileScreen from './ViewProfileScreen';

const Stack = createNativeStackNavigator();

function App() {
	return (
		<Stack.Navigator initialRouteName="Usuarios">
			<Stack.Screen name="Usuarios" component={ContactsScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Perfil" component={ViewProfileScreen} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}

export default App;
