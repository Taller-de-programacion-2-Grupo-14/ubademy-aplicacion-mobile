import React, { Component } from 'react';
import { register } from '../src/services/register';
import { login } from '../src/services/login';
import { AsyncStorage } from 'react-native';
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
  Select,
  CheckIcon,
  WarningOutlineIcon,
  Icon,
  IconButton,
  HStack,
  Divider,
  Center,
  ScrollView,
  Image,
  Modal
} from 'native-base';



function RegisterScreen({ navigation }) {
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [perfil, setPerfil] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [interests, setInterests] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  handleSubmit = () => {
    register(mail, password, name, lastName, perfil, location)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.status === 200) {
          login(mail, password)
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              if (json.status === 200) {
                SecureStore.setItemAsync('secure_token', json.token);
                console.log(json.token);
                setShowModal(true);
              } else {
                console.log('email o contrasenia invalidos');
              }

            })
            .catch((error) => {
              console.error(error);
            });
          //navigation.navigate("LoginScreen")
        } else {
          console.log('registro fallido');
        }

      })
      .catch((error) => {
        console.error(error);
      });

  };

  return (
    <NativeBaseProvider>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">¡Registro exitoso!</Text>
              </HStack>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              onPress={() => {
                navigation.navigate("HomeScreen")
              }}
            >
              Continuar
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <ScrollView
        _contentContainerStyle={{
          px: "20px",
          mb: "4",
        }}
      >
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
            <FormControl isRequired>
              <FormControl.Label
                _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                Email
              </FormControl.Label>
              <Input onChangeText={(mail) => setMail(mail)} />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label
                _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                Password
              </FormControl.Label>
              <Input type="password" onChangeText={(password) => setPassword(password)} />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label
                _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                Nombre
              </FormControl.Label>
              <Input onChangeText={(name) => setName(name)} />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label
                _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                Apellido
              </FormControl.Label>
              <Input onChangeText={(lastName) => setLastName(lastName)} />
            </FormControl>


            {/* <FormControl>
              <FormControl.Label
                _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                Perfil
              </FormControl.Label>
              <Input onChangeText={(perfil) => setPerfil(perfil)} />
            </FormControl> */}
            <FormControl isRequired>
              <FormControl.Label>Perfil</FormControl.Label>
              <Select
                minWidth="200"
                accessibilityLabel="Elija uno.."
                placeholder="Elija uno.."
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size={5} />,
                }}
                mt="1"
              >
                <Select.Item label="Estudiante" value="Student" />
                <Select.Item label="Creador" value="Creator" />
                <Select.Item label="Colaborador" value="Collaborator" />
              </Select>
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Seleccionar uno
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Intereses</FormControl.Label>
              <VStack space={2}>
                <HStack alignItems="baseline">
                  <Heading fontSize="lg">Intereses</Heading>
                </HStack>
                <VStack>
                  <Box>
                    <Text>Seleccionados: ({interests.length})</Text>
                  </Box>
                </VStack>
                <Checkbox.Group
                  colorScheme="green"
                  defaultValue={interests}
                  accessibilityLabel="pick an item"
                  onChange={(interests) => {
                    setInterests(interests || [])
                  }}
                >
                  <Checkbox value="Matematica" my="1">
                    Matematica
                  </Checkbox>
                  <Checkbox value="Programacion" my="1">
                    Programacion
                  </Checkbox>
                  <Checkbox value="Cocina" my="1">
                    Cocina
                  </Checkbox>
                  <Checkbox value="Jadrineria" my="1">
                    Jadrineria
                  </Checkbox>
                </Checkbox.Group>
              </VStack>
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label
                _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                Ubicacion
              </FormControl.Label>
              <Input onChangeText={(location) => setLocation(location)} />
            </FormControl>
            {/* <FormControl>
              <FormControl.Label
                _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                Tipo de curso de mayor interes
              </FormControl.Label>
              <Input onChangeText={(interes) => setInteres(interes)} />
            </FormControl> */}
            <Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.handleSubmit()} >
              Registrate
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default RegisterScreen;
