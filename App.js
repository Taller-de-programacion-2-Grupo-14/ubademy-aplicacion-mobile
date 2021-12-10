import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import Home from './screens/Home';
import PasswordOlvidadoScreen from './screens/PasswordOlvidadoScreen';
import RecuperoPasswordScreen from './screens/RecuperoPasswordScreen';
import LocationScreen from './screens/LocationScreen';
import UpdateUsuarioScreen from './screens/UpdateUsuarioScreen';


const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="LoginScreen">
				<Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
				<Stack.Screen name="RegisterScreen" component={RegisterScreen} />
				<Stack.Screen name="LocationScreen" component={LocationScreen} />
				<Stack.Screen name="UpdateUsuarioScreen" component={UpdateUsuarioScreen} />
				<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
				<Stack.Screen name="PasswordOlvidadoScreen" component={PasswordOlvidadoScreen} />
				<Stack.Screen name="RecuperoPasswordScreen" component={RecuperoPasswordScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
