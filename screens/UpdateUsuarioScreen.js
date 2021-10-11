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
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [interes, setInteres] = React.useState("");
  const [showModal, setShowModal] = React.useState(false)

  onSubmit = () => {
    editarUsuario(name, location, interes)
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 200) {
          setShowModal(true);
        }
      })
    //if ok
    //llamar a login

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
              Continue
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
            Confirmar
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}


export default UpdateUsuarioScreen
