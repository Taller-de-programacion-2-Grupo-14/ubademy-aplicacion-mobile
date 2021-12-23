import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MessagesStackScreen from './MessagesStackScreen';
import ContactsStackScreen from './ContactsStackScreen';
import NotificationsScreen from './NotificationsScreen';
import Constants from 'expo-constants';

function Messages() {
	return (
		<MessagesStackScreen />
	);
}

function Contacts() {
	return (
		<ContactsStackScreen />
	);
}

function Notifications() {
	return (
		<NotificationsScreen />
	);
}

const Tab = createMaterialTopTabNavigator();

export default function App() {
	return (
		<Tab.Navigator
			screenOptions={{
				swipeEnabled: false
			}} style={{ marginTop: Constants.statusBarHeight }}>
			<Tab.Screen name="Messages" component={Messages} />
			<Tab.Screen name="Contactos" component={Contacts} />
			<Tab.Screen name="Avisos" component={Notifications} />
		</Tab.Navigator>
	);
}
