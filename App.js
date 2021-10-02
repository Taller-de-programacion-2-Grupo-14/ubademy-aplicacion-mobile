import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Text from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';

class SignIn extends React.Component{
  render(){
  return (
    <Text>Hola Cachorro</Text>
  );
}}



class SignUp extends React.Component {
  render(){
    return (
      <Text>Bienvenido Cachorro</Text>
  );
}}

const Stack = createStackNavigator();

function MyStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
  );
}


export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
