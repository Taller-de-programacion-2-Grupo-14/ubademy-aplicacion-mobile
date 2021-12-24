import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
	NativeBaseProvider,
	Pressable,
	Menu,
	Box,
	Button,
	HStack,
	VStack,
	Modal,
	Text,
	Divider,
	Heading,
	Spinner,
	Link,
	FlatList,
	Flex,
	Stack,
	Image,
	Center
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { desinscripcionCurso } from '../src/services/desinscripcionCurso';
import { obtenerExamenes } from '../src/services/obtenerExamenes';

MiCursoInscriptoScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function MiCursoInscriptoScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [showModal, setShowModal] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const [examenes, setExamenes] = React.useState([]);

	const desinscribirse = () =>
		Alert.alert(
			'Desinscripción',
			'Ya no podrá rendir exámenes ni ver el contenido del curso.\n¿Está seguro que desea desinscribirse de este curso?',
			[
				{
					text: 'Cancelar',
					style: 'cancel'
				},
				{
					text: 'OK', style: 'destructive',
					onPress: () => {
						desinscripcionCurso(String(route.params.courseid))
							.then((response) => response.json())
							.then((json) => {
								if (json.status === 200) {
									setMessage('Desincripción exitosa');
									setShowModal(true);
								} else {
									setError(true);
									setMessage('Error al desinscribirse');
									setShowModal(true);
								}
							});
					}
				}
			]
		);

	const renderItem = ({ item }) => (
		<Link onPress={() => {route.params.verComoCreador ? item['verComoCreador'] = true : item['verComoCreador'] = false; item['course_id'] = route.params.id; navigation.navigate('ResolverExamenScreen', item);}}>
			<Box bg="#0BC86C" p="5" rounded="8" style={{ width: 350, marginVertical: 25}}>
				<Heading color="cyan.50" mt="2" fontWeight="medium" fontSize="lg" bold>
					{item.title}
				</Heading>
				<Flex>
					<Text mt="2" fontSize="xs" fontWeight="medium" color="cyan.800">
						Ingresar
					</Text>
				</Flex>
			</Box>
		</Link>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			obtenerExamenes(String(route.params.id), '')
				.then(data => data.json())
				.then(json => {
					console.log(json);
					setExamenes(json.message);
					setLoading(false);
				});
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);

	return (

		<NativeBaseProvider>
			{
				loading ?
					<View style={spinnerStyles.spinnerStyle}>
						<Spinner color="indigo.500" size="lg" />
					</View> :
					<>
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
											error ? setShowModal(false) : navigation.navigate('MisCursosScreen');
										}}
									>
										Continuar
									</Button>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
						<Box style={{ position: 'absolute', top: 20, right: 20 }}>
							<Menu
								w="190"
								trigger={(triggerProps) => {
									return (
										<Pressable accessibilityLabel="More options menu" {...triggerProps} >
											<Icon name="more-vert" size={35} />
										</Pressable>
									);
								}}
							>
								<Menu.Item onPress={() => { navigation.navigate('VerMultimediaScreen', route.params); }} >Ver contenido multimedia</Menu.Item>
								<Menu.Item isDisabled={route.params.verComoCreador ? true : false} onPress={() => { navigation.navigate('ResueltosScreen', route.params.id); }} >Exámenes resueltos</Menu.Item>
								<Menu.Item isDisabled={route.params.verComoCreador ? true : false} onPress={desinscribirse} >Desinscripción del curso</Menu.Item>
								{route.params.verComoCreador ?
									<Menu.Item onPress={() => { navigation.goBack(); }} >Ver curso como creador</Menu.Item> :
									<Menu.Item onPress={() => { navigation.navigate('MisCursosScreen'); }} >Salir del curso</Menu.Item>
								}
							</Menu>
						</Box>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="12" style={{ justifyContent: 'center' }}>
							<Stack
								direction={['column', 'column', 'row']}
								rounded="lg"
								overflow="hidden"
								w="90%"
								shadow="1"
								_light={{ backgroundColor: 'coolGray.50' }}
								_dark={{ backgroundColor: 'gray.700' }}>
								<Box>
									<Image
										w={['100%', '100%', '40']}
										h="40"
										source={{
											uri:
												(route.params.profile_pic_url=='') ? 'https://firebasestorage.googleapis.com/v0/b/uba-demy.appspot.com/o/imagenes%2Fbanners%2Fgenerica.jpeg?alt=media&token=a62d3455-4a3c-4ca3-ab19-4df2d63c2ce9' :
													route.params.profile_pic_url,
										}}
										alt="image"
									/>
									<Center
										bg="violet.500"
										_text={{ color: 'white', fontWeight: '700', fontSize: 'xs' }}
										position="absolute"
										bottom="0"
										px="3"
										py="1.5">
										Suscripción: {(route.params.subscription=='basico' || route.params.subscription=='básico' || route.params.subscription=='Basico') ? 'Básico' :
											((route.params.subscription=='estandar' || route.params.subscription=='estándar' || route.params.subscription=='Estandar') ? 'Estándar' : 'Premium')
										}
									</Center>
								</Box>
								<Stack p="4" space={[3, 3, 1.5]}>
									<Heading size="md" ml="-1">
										{route.params.name}
									</Heading>
								</Stack>
							</Stack>
							<Divider my="5" />
							<Heading size="xl" color="coolGray.800" fontWeight="600">
								Exámenes a resolver
							</Heading>
							<FlatList
								data={examenes}
								renderItem={renderItem}
								keyExtractor={item => String(item.title)}
							/>
						</Box>
					</>
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

export default MiCursoInscriptoScreen;
