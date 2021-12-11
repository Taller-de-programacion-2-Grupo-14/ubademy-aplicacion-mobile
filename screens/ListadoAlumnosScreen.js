import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
	NativeBaseProvider,
	Box,
	Modal,
	FormControl,
	Input,
	VStack,
	HStack,
	Button,
	Link,
	Text,
	SearchIcon,
	Heading,
	Spinner,
	Pressable,
	Icon,
	Avatar,
	Spacer,
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import Moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerAlumnos } from '../src/services/obtenerAlumnos';
import PropTypes from 'prop-types';
import { useState } from 'react';

ListadoAlumnosScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function ListadoAlumnosScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [alumnos, setAlumnos] = React.useState([]);
	const [showModal, setShowModal] = useState(false);
	const [nombre, setNombre] = React.useState('');
	const [apellido, setApellido] = React.useState('');
	const [message, setMessage] = React.useState('');
	const [bloqueado, setBloqueado] = React.useState(false);
	const [showModalError, setShowModalError] = React.useState(false);
	const isFocused = useIsFocused();

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			obtenerAlumnos(String(route.params), nombre, apellido, true)
				.then((response) => response.json())
				.then((json) => {
					console.log(json);
					switch (json.status) {
						case 503:
							setMessage('Ops! Algo salio mal, intente más tarde');
							setShowModalError(true);
							break;
						case 403:
							setMessage('Usuario bloqueado');
							setBloqueado(true);
							setShowModalError(true);
							break;
						case 401:
							setMessage('Token expirado');
							setShowModalError(true);
							break;
						default:
							setAlumnos(json.message);
					}
					setLoading(false);
				});
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [isFocused])
	);

	this.onSubmit = () => {
		console.log(nombre);
		console.log(apellido);
		obtenerAlumnos(String(route.params), nombre, apellido, true)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				setAlumnos(json.message);
				setLoading(false);
			});
	};

	return (

		<NativeBaseProvider>
			<Box bg="white" flex="1" safeAreaTop>
				{
					loading ?
						<View style={spinnerStyles.spinnerStyle}>
							<Spinner color="indigo.500" size="lg" />
						</View> :
						<>
							<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
								<Modal.Content maxWidth="400px">
									<Modal.CloseButton />
									<Modal.Header>Búsqueda</Modal.Header>
									<Modal.Body>
										<FormControl>
											<FormControl.Label>Nombre</FormControl.Label>
											<Input onChangeText={(nombre) => setNombre(nombre)} />
										</FormControl>
										<FormControl mt="3">
											<FormControl.Label>Apellido</FormControl.Label>
											<Input onChangeText={(apellido) => setApellido(apellido)} />
										</FormControl>
									</Modal.Body>
									<Modal.Footer>
										<Button.Group space={2}>
											<Button
												variant="ghost"
												colorScheme="blueGray"
												onPress={() => {
													setShowModal(false);
												}}
											>
												Cancelar
											</Button>
											<Button
												onPress={() => {
													this.onSubmit();
													setShowModal(false);
													setNombre('');
													setApellido('');
												}}
											>
												Buscar
											</Button>
										</Button.Group>
									</Modal.Footer>
								</Modal.Content>
							</Modal>
							<Modal isOpen={showModalError} onClose={() => { if (bloqueado) { navigation.navigate('LoginScreen'); } setShowModalError(false); }} size="lg">
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
												bloqueado ? navigation.navigate('LoginScreen') : navigation.goBack();
												setShowModalError(false);
											}}
										>
											Continuar
										</Button>
									</Modal.Footer>
								</Modal.Content>
							</Modal>
							<Link onPress={() => setShowModal(true)} style={{ position: 'absolute', right: 20, top: 10 }}>
								<SearchIcon size="8" />
							</Link>
							<Box bg="white" flex="1" safeAreaTop>
								<Heading p="4" pb="3" size="lg">
									Alumnos del curso
								</Heading>
								{
									loading ?
										<View style={spinnerStyles.spinnerStyle}>
											<Spinner color="indigo.500" size="lg" />
										</View> :
										<Basic listData={alumnos} />
								}
							</Box>
						</>
				}
			</Box>
		</NativeBaseProvider>
	);
}
function Basic({ listData }) {

	const closeRow = (rowMap, rowKey) => {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
		console.log('en close row');
	};

	const onRowDidOpen = (rowKey) => {
		console.log('This row opened', rowKey);
	};

	const renderItem = ({ item }) => (

		< Box >
			<Pressable onPress={() => console.log('You touched me')} bg="white">
				<Box
					pl="4"
					pr="5"
					py="2"
				>
					<HStack alignItems="center" space={3}>
						{(item.photo_url == '' || item.photo_url == null || item.photo_url == 'undefined') ? (<Avatar bg="indigo.500" size="48px" >{item.first_name.charAt(0).toUpperCase()}</Avatar>) :
							<Avatar size="48px" source={{ uri: item.photo_url }} />
						}
						<VStack>
							<Text color="coolGray.800" _dark={{ color: 'warmGray.50' }} bold>
								{item.first_name} {item.last_name}
							</Text>
						</VStack>
						<Spacer />
						<VStack>
							<Text fontSize="xs" color="coolGray.800" _dark={{ color: 'warmGray.50' }} >
								Se registro el
							</Text>
							<Text fontSize="xs" color="coolGray.800" _dark={{ color: 'warmGray.50' }} alignSelf="flex-start">
								{Moment(item.created_at).format('d MMM YYYY')}
							</Text>
						</VStack>
					</HStack>
				</Box>
			</Pressable>
		</Box >

	);

	const renderHiddenItem = (data, rowMap) => (
		<HStack flex="1" pl="2">
			<Pressable
				w="70"
				ml="auto"
				bg="coolGray.200"
				justifyContent="center"
				onPress={() => closeRow(rowMap, data.item.key)}
				_pressed={{
					opacity: 0.5,
				}}>
				<VStack alignItems="center" space={2}>
					<Icon
						as={<Entypo name="dots-three-horizontal" />}
						size="xs"
						color="coolGray.800" onPress={() => console.log('hola')}
					/>
					<Text fontSize="xs" fontWeight="medium" color="coolGray.800" onPress={() => console.log('hola')}>
						Ver
					</Text>

				</VStack>
			</Pressable>
			<Pressable
				w="70"
				bg="indigo.500"
				justifyContent="center"
				onPress={() => console.log('Quiere chatear')}
				_pressed={{
					opacity: 0.5,
				}}>
				<VStack alignItems="center" space={2}>
					<Text color="white" fontSize="xs" fontWeight="medium">
						Enviar
					</Text>
					<Icon as={<MaterialIcons name="message" />} color="white" size="xs" />
				</VStack>
			</Pressable>
		</HStack>
	);

	return (
		<Box bg="white" safeArea flex="1">
			<SwipeListView
				data={listData}
				renderItem={renderItem}
				renderHiddenItem={renderHiddenItem}
				rightOpenValue={-130}
				previewRowKey={'0'}
				previewOpenValue={-40}
				previewOpenDelay={3000}
				onRowDidOpen={onRowDidOpen}
				keyExtractor={(item, index) => index.toString()}
			/>
		</Box>
	);
}


Basic.propTypes = {
	listData: PropTypes.array
};
const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default ListadoAlumnosScreen;
