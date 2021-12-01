import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MessagesScreen from './MessagesScreen';
import ContactsScreen from './ContactsScreen';
import Constants from 'expo-constants';

function Messages() {
	return (
		<MessagesScreen />
	);
}

function Contacts() {
	return (
		<ContactsScreen />
	);
}

const Tab = createMaterialTopTabNavigator();

export default function App() {
	return (
		<Tab.Navigator style={{ marginTop: Constants.statusBarHeight }}>
			<Tab.Screen name="Mensajes" component={Messages} />
			<Tab.Screen name="Contactos" component={Contacts} />
		</Tab.Navigator>
	);
}
