import React from 'react'
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

function LoginScreen({ navigation }) {
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
            source={require('../images/logo.png')}
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
            <Link onPress={() => navigation.navigate('RegisterScreen')}
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

export default LoginScreen
