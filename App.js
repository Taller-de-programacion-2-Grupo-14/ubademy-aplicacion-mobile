import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider,
  Center,
  Image
} from 'native-base';
import { createServer } from "miragejs";
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
//import FirstPage from './components/FirstPage/FirstPage';

if (window.server) {
  server.shutdown()
}

window.server = createServer({
  routes() {
    this.get("/api/cursos", () => {
      return {
        cursos: [
          /*{ id: 1, name: "Data Science", year: 2010 },
          { id: 2, name: "Docker", year: 2014 },
          { id: 3, name: "Matematica", year: 2017 },*/
        ],
      }
    })
  },
})

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="FirstPage" component={FirstPage} /> */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
