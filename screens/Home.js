import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './HomeScreen';
import UserScreen from './UserScreen';
import CursosScreen from './CursosScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeBaseProvider } from 'native-base';

const Tab = createMaterialBottomTabNavigator();

export default function HomeApp() {
	return (
		<NativeBaseProvider>
			<Tab.Navigator activeColor="white" inactiveColor="white" shifting={true} barStyle={{ backgroundColor: '#736bfc' }}>
				<Tab.Screen
					name="HomeScreen"
					component={HomeScreen}
					options={{
						tabBarLabel: 'Home',
						tabBarIcon: ({ focused }) => (
							<MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} color='white' size={26} />
						),
					}}
				/>
				<Tab.Screen
					name="Perfil"
					component={UserScreen}
					options={{
						tabBarLabel: 'Perfil',
						tabBarIcon: ({ focused }) => (
							<MaterialCommunityIcons name={focused ? 'account' : 'account-outline'} color='white' size={26} />
						),
					}}
				/>
				<Tab.Screen
					name="Cursos"
					component={CursosScreen}
					options={{
						tabBarLabel: 'Cursos',
						tabBarIcon: ({ focused }) => (
							<MaterialCommunityIcons name={focused ? 'book-open-page-variant' : 'book-open-variant'} color='white' size={26} />
						),
					}}
				/>
			</Tab.Navigator>
		</NativeBaseProvider>
	);
}
