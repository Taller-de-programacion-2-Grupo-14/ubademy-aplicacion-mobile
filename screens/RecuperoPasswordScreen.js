import React from 'react';
import { recuperoPassword } from '../src/services/recuperoPassword';
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
  Icon,
  IconButton,
  HStack,
  Divider,
  Center,
  Image
} from 'native-base';

function RecuperoPasswordScreen({ navigation }) {
	const [token, setToken] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  onSubmit = () => {
    recuperoPassword(token, newPassword)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.status === 200) {
					console.log('Contrasenia modificada correctamente');
					navigation.navigate("LoginScreen")
        } else {
					if (json.status === 400){
						console.log('Nuevo password invalido');
					} else {
						if (json.status === 401){
							console.log('Token invalido');
						} else {
							if (json.status === 403){
								console.log('No token provisto');
							} else {
								console.log('Error desconocido');
							}
						}
					}
        }

      })
      .catch((error) => {
        console.error(error);
      });

  }
	return (
		<NativeBaseProvider>
			<Box safeArea flex={1} p="2" py="8" w="90%" mx="auto" style={{ justifyContent: 'center' }}>
				<Center>
					<Image
						source={require('../images/logo.png')}
						alt="Logo"
						size="xl"
					/>
				</Center>
				<Heading size="lg" fontWeight="600" color="coolGray.800">
          Recupero de contraseña
				</Heading>

				<VStack space={3} mt="5">
					<FormControl>
						<FormControl.Label
							_text={{
								color: 'coolGray.800',
								fontSize: 'xs',
								fontWeight: 500,
							}}>
              Ingrese el token que se le ha enviado por mail
						</FormControl.Label>
						<Input onChangeText={(token) => setToken(token)} />
					</FormControl>

					<FormControl>
						<FormControl.Label
							_text={{
								color: 'coolGray.800',
								fontSize: 'xs',
								fontWeight: 500,
							}}>
							Ingrese el nuevo password
						</FormControl.Label>
						<Input onChangeText={(newPassword) => setNewPassword(newPassword)} />
					</FormControl>

					<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()} >
            Continuar
					</Button>
				</VStack>
			</Box>
		</NativeBaseProvider>
	);
}

export default RecuperoPasswordScreen;
