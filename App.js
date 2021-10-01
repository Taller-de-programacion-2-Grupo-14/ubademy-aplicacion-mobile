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
import FirstPage from './components/FirstPage/FirstPage';

if (window.server) {
  server.shutdown()
}

window.server = createServer({
  routes() {
    this.get("/api/cursos", () => {
      return {
        cursos: [
          { id: 1, name: "Data Science", year: 2010 },
          { id: 2, name: "Docker", year: 2014 },
          { id: 3, name: "Matematica", year: 2017 },
        ],
      }
    })
  },
})


function SignIn({ navigation }) {
  let [cursos, setCursos] = React.useState([])

  React.useEffect(() => {
    fetch("/api/cursos")
      .then((res) => res.json())
      .then((json) => setCursos(json.cursos))
  }, [])

  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto" style={{ justifyContent: 'center'}}>
        <Center>
          <Image
            source={require('./images/logo.png')}
            alt="Logo"
            size="xl"
          />
        </Center>
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          Bienvenido
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Iniciar sesion
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
                fontSize: 'xs',
                fontWeight: 500,
              }}>
              Email
            </FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
                fontSize: 'xs',
                fontWeight: 500,
              }}>
              Password
            </FormControl.Label>
            <Input type="password" />
            <Link
              _text={{ fontSize: 'xs', fontWeight: '500', color: 'indigo.500' }}
              alignSelf="flex-end"
              mt="1">
              ¿Olvido su contraseña?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" _text={{ color: 'white' }}  >
            Iniciar sesion
          </Button>
            {cursos.map((cursos) => (
              <Text key={cursos.id}>
                {cursos.name} ({cursos.year})
              </Text>
            ))}
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="muted.700" fontWeight={400}>
              ¿Usuario nuevo?{' '}
            </Text>
            <Link onPress={() => navigation.navigate('SignUp')}
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
            >
              Registrate
            </Link>
          </HStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

function SignUp({ navigation }) {
  console.log("holaaaaaaaaaaa")
  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center'}}>
        <Center>
          <Image
            source={require('./images/logo.png')}
            alt="Logo"
            size="xl"
          />
        </Center>
        <Heading size="lg" color="coolGray.800" fontWeight="600">
          Bienvenido
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Registrate para continuar!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label
              _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
              Email
            </FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
              Password
            </FormControl.Label>
            <Input type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
              Confirmar Password
            </FormControl.Label>
            <Input type="password" />
          </FormControl>
          <Button mt="2" colorScheme="indigo" _text={{ color: 'white' }}>                                                                                   
            Registrate
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* <Stack.Screen name="FirstPage" component={FirstPage} /> */}
        <Stack.Screen name="Home" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
