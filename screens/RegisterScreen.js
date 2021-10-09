import React from 'react'
import { register } from '../src/services/register';
import { AsyncStorage } from 'react-native';
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

function RegisterScreen({ navigation }) {
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [perfil, setPerfil] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [interes, setInteres] = React.useState("");
  onSubmit = () => {
    register(mail, password, name, perfil, location, interes)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.status === 200) {
          AsyncStorage.setItem('token', json.token);
          console.log(json.token);
          navigation.navigate("LoginScreen")
        } else {
          console.log('registro fallido');
        }

      })
      .catch((error) => {
        console.error(error);
      });

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
            <Input onChangeText={(mail) => setMail(mail)} />
          </FormControl>

          <FormControl>
            <FormControl.Label
              _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
              Password
            </FormControl.Label>
            <Input type="password" onChangeText={(password) => setPassword(password)} />
          </FormControl>

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
              Perfil
            </FormControl.Label>
            <Input onChangeText={(perfil) => setPerfil(perfil)} />
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

export default RegisterScreen
