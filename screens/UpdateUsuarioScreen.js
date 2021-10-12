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
  Image,
  Modal
} from 'native-base';
import { editarUsuario } from '../src/services/editarUsuario';

function UpdateUsuarioScreen({ navigation }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [intrests, setIntrests] = React.useState("");
  const [showModal, setShowModal] = React.useState(false)

  onSubmit = () => {
    //setShowModal(true);
    // editarUsuario(firstName, lastName, location, intrests)
    //   .then((response) => response.json())
    //   .then((json) => {
    //     if (json.status === 200) {
    //       setShowModal(true);
    //     }
    //   })
  }

  return (
    <NativeBaseProvider>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Datos actualizados</Text>
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
      <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
        <Heading size="lg" color="coolGray.800" fontWeight="600">
          Editar usuario
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label
              _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
              Nombre
            </FormControl.Label>
            <Input onChangeText={(firstName) => setFirstName(firstName)} />
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
            <Input onChangeText={(intrests) => setIntrests(intrests)} />
          </FormControl>
          <Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => navigation.navigate("HomeScreen")} >
            Confirmar
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

export default UpdateUsuarioScreen
