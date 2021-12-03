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
	Flex
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { bajaDeColaborador } from '../src/services/bajaDeColaborador';
import { obtenerUsuario } from '../src/services/obtenerUsuario';
import { obtenerExamenes } from '../src/services/obtenerExamenes';

MiCursoColaboradorScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function MiCursoColaboradorScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [showModal, setShowModal] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const [miId, setMiId] = React.useState(0);
	const [examenes, setExamenes] = React.useState([]);

	const baja = () =>
		Alert.alert(
			'Darse de baja',
			'Ya no podrá corregir exámenes ni responder consultas en este curso.\n¿Está seguro que desea darse de baja?',
			[
				{
					text: 'Cancelar',
					style: 'cancel'
				},
				{ text: 'OK', style: 'destructive',
					onPress: () => {
						bajaDeColaborador(String(route.params.courseid), miId)
							.then((response) => response.json())
							.then((json) => {
								if (json.status === 200) {
									setMessage('Baja exitosa');
									setShowModal(true);
								} else {
									setError(true);
									setMessage('Error al darse de baja');
									setShowModal(true);
								}
							});
					}
				}
			]
		);

	const renderItem = ({ item }) => (
		<Link >
			<Box bg="#0BC86C" p="5" rounded="8" style={{ width: 350, marginVertical: 25}}>
				<Heading color="cyan.50" mt="2" fontWeight="medium" fontSize="lg" bold>
					{item.nombre}
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
			obtenerUsuario()
				.then(data => data.json())
				.then(json => {
					setMiId(json.user_id);
				});
			obtenerExamenes(String(route.params.id))
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
						<Box style={{top: 20, alignItems: 'flex-end'}}>
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
								<Menu.Item onPress={baja} >Darse de baja del curso</Menu.Item>
								<Menu.Item onPress={() => {navigation.navigate('MisCursosScreen');}} >Salir del curso</Menu.Item>
							</Menu>
						</Box>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<Heading size="2xl" color="coolGray.800" fontWeight="600">
								{ route.params.name }
							</Heading>
							<Divider my="5" />
							<Heading size="xl" color="coolGray.800" fontWeight="600">
								Exámenes
							</Heading>
							<FlatList
								data={examenes}
								renderItem={renderItem}
								keyExtractor={item => String(item.id)}
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

export default MiCursoColaboradorScreen;
