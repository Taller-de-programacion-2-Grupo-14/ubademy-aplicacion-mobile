import React from 'react'
import { getList } from '../src/services/list';
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
import { login } from '../src/services/login';

function RegisterScreen({ navigation }) {
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");


  handleClick = () => {
    registrarUsuario(user, password)
      .then((response) => response.json())
      .then((json) => {
        return json.status;
      })
    //if ok
    //llamar a login

  }

  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
        <Center>
          <Image
            source={require('../images/logo.png')}
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
            <Input onChangeText={(user) => setUser(user)} />
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
            <Input type="password" onChangeText={(password) => setPassword(password)} />
          </FormControl>
          <Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.handleClick()}>
            Registrate
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

export default RegisterScreen
