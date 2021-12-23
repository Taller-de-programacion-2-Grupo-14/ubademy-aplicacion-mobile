import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessagesScreen from './MessagesScreen';
import ChatScreen from './ChatScreen';

const Stack = createNativeStackNavigator();

function App() {
	return (

		<Stack.Navigator initialRouteName="MessagesScreen">
			<Stack.Screen name="Inbox" component={MessagesScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
		</Stack.Navigator>

	);
}

export default App;
