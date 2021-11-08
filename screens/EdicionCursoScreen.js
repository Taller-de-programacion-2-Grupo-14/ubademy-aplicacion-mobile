import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	ScrollView,
  Text,
  CheckIcon,
  Input,
  Select,
	Spinner,
  FormControl,
  HStack,
  VStack,
  WarningOutlineIcon,
  Modal,
  Button
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { obtenerCurso } from '../src/services/obtenerCurso';
import { editarCurso } from '../src/services/editarCurso';

EdicionCursoScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

function EdicionCursoScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState(false);
  const [titulo, setTitulo] = React.useState('');
  const [suscripcion, setSuscripcion] = React.useState('');
  const [descripcion, setDescripcion] = React.useState('');
  const [hashtags, setHashtags] = React.useState('');
  const [examenes, setExamenes] = React.useState('');
  const [tipoDeCurso, setTipoDeCurso] = React.useState('');
  const [location, setLocation] = React.useState('');

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
      obtenerCurso(route.params.course_name)
				.then(data => data.json())
				.then(json => {
					setLoading(false);
          setTitulo(json.course_name)
					setDescripcion(json.course_description);
					setHashtags(json.hashtags);
					setExamenes(json.amount_exams);
					setTipoDeCurso(json.course_type);
					setLocation(json.location);
          setSuscripcion(json.subscription);
				});
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);

  this.onSubmit = () => {
    editarCurso(titulo, descripcion, hashtags, examenes, tipoDeCurso, location, suscripcion)
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 200) {
          setShowModal(true);
          setMessage('Datos actualizados');
        } else {
          setError(true);
          setShowModal(true);
          setMessage('Ha ocurrido un error');
        }
      });
  };

	return (

		<NativeBaseProvider>
			{
				loading ?
					<View style={spinnerStyles.spinnerStyle}>
						<Spinner color="indigo.500" size="lg" />
					</View> :
					<ScrollView
						_contentContainerStyle={{
							px: '20px',
							mb: '4',
						}}
					>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
              <Modal.Content maxWidth="350">
                <Modal.Body>
                  <VStack space={3}>
                    <HStack alignItems="center" justifyContent="space-between">
                      <Text fontWeight="medium">{message}</Text>
                    </HStack>
                  </VStack>
                </Modal.Body>
                <Modal.Footer>
                  <Button colorScheme="indigo"
                    flex="1"
                    onPress={() => {
                      setShowModal(false);
                      if (!error) navigation.goBack();
                    }}
                  >
                    Continuar
                  </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
            <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
              <Heading size="lg" color="coolGray.800" fontWeight="600">
                Editar { route.params }
              </Heading>
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label
                    _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                    Titulo
                  </FormControl.Label>
                  <Input onChangeText={(titulo) => setTitulo(titulo)} value={titulo} />
                </FormControl>

                <FormControl>
                  <FormControl.Label
                    _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                    Descripcion
                  </FormControl.Label>
                  <Input onChangeText={(descripcion) => setDescripcion(descripcion)} value={descripcion} />
                </FormControl>

                <FormControl>
                  <FormControl.Label
                    _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                    Hashtags asociados
                  </FormControl.Label>
                  <Input onChangeText={(hashtags) => setHashtags(hashtags)} value={hashtags} />
                </FormControl>

                <FormControl>
                  <FormControl.Label>Tipo de curso</FormControl.Label>
                  <Select
                    selectedValue={tipoDeCurso}
                    minWidth="200"
                    accessibilityLabel="Elegir un tipo de curso"
                    placeholder="Elegir un tipo de curso"
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    onValueChange={(tipoDeCurso) => setTipoDeCurso(tipoDeCurso)} value={tipoDeCurso}
                  >
                    <Select.Item label="Matemática" value="Matemática" />
                    <Select.Item label="Programación" value="Programación" />
                    <Select.Item label="Cocina" value="Cocina" />
                  </Select>
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    Seleccionar uno
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl>
                  <FormControl.Label
                    _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                    Cantidad de exámenes
                  </FormControl.Label>
                  <Input onChangeText={(examenes) => setExamenes(examenes)} value={examenes} />
                </FormControl>

                <FormControl>
                  <FormControl.Label>Tipo de suscripción</FormControl.Label>
                  <Select
                    selectedValue={suscripcion}
                    minWidth="200"
                    accessibilityLabel="Elegir suscripción"
                    placeholder="Elegir suscripción"
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    onValueChange={(suscripcion) => setSuscripcion(suscripcion)} value={suscripcion}
                  >
                    <Select.Item label="Básico" value="Básico" />
                    <Select.Item label="Estándar" value="Estándar" />
                    <Select.Item label="Premium" value="Premium" />
                  </Select>
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    Seleccionar uno
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl>
                  <FormControl.Label
                    _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                    Ubicacion
                  </FormControl.Label>
                  <Input onChangeText={(location) => setLocation(location)} value={location} />
                </FormControl>

                <Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.onSubmit()} >
                  Confirmar
                </Button>
              </VStack>
            </Box>
					</ScrollView>
			}
		</NativeBaseProvider>
	);
}

const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default EdicionCursoScreen;
