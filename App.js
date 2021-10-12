import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import UpdateUsuarioScreen from './screens/UpdateUsuarioScreen'
import PasswordOlvidadoScreen from './screens/PasswordOlvidadoScreen'
import RecuperoPasswordScreen from './screens/RecuperoPasswordScreen'


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="UpdateUsuarioScreen" component={UpdateUsuarioScreen} />
        <Stack.Screen name="PasswordOlvidadoScreen" component={PasswordOlvidadoScreen} />
        <Stack.Screen name="RecuperoPasswordScreen" component={RecuperoPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
