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

function updateUsuarioScreen({ navigation }) {
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
          Editar usuario
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label
              _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
              Nombre
            </FormControl.Label>
            <Input onChangeText={(name) => setName(name)} />
          </FormControl>

          <FormControl>
            <FormControl.Label
              _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
              Ubicacion
            </FormControl.Label>
            <Input onChangeText={(location) => setLocation(location)} />
          </FormControl>

          <FormControl>
            <FormControl.Label
              _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
              Tipo de curso de mayor interes
            </FormControl.Label>
            <Input onChangeText={(interes) => setInteres(interes)} />
          </FormControl>
          <Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()} >
            Registrate
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

export default updateUsuarioScreen
