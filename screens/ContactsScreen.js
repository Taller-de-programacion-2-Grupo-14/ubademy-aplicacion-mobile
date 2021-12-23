import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { obtenerUsuarios } from '../src/services/obtenerUsuario';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import {
	NativeBaseProvider,
	Box,
	Text,
	Pressable,
	Heading,
	Icon,
	HStack,
	Avatar,
	VStack,
	Spacer,
	Spinner,
	Modal,
	FormControl,
	Input,
	Button,
	Link,
	SearchIcon
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import Moment from 'moment';
import * as SecureStore from 'expo-secure-store';

export default function Contactscreen({ navigation }) {
	const isFocused = useIsFocused();
	const [loading, setLoading] = React.useState(true);
	const [users, setUsers] = React.useState({});
	const [email, setEmail] = React.useState('');
	const [emailBusqueda, setEmailBusqueda] = React.useState('');
	const [showModal, setShowModal] = React.useState(false);
	const [nombre, setNombre] = React.useState('');
	const [apellido, setApellido] = React.useState('');

	Moment.locale('es');
	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			SecureStore.getItemAsync('user_email').then((value) => {
				setEmail(value);
				obtenerUsuarios(false, value)
					.then(data => data.json())
					.then(json => {
						setLoading(false);
						console.log(json.users);
						setUsers(json.users);
					});
			});
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
				setUsers([]);
			};
		}, [isFocused, email])
	);
	this.onSubmit = () => {
		setLoading(true);
		console.log(nombre);
		console.log(apellido);
		console.log(emailBusqueda);
		obtenerUsuarios(false, emailBusqueda)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				setUsers(json.message);
				setLoading(false);
			});
	};
	return (
		<NativeBaseProvider>
			<Box bg="white" flex="1" safeAreaTop>
				<HStack>
					<Heading p="4" pb="3" size="lg">
						Usuarios de Ubademy
					</Heading>
					<Link onPress={() => setShowModal(true)} style={{ position: 'absolute', right: 20, top: 10 }}>
						<SearchIcon size="6" />
					</Link>
				</HStack>
				<Text pl="4" pb="2" color="coolGray.800" _dark={{ color: 'warmGray.50' }} >
					Selecciona un usuario y enviale un mensaje personal
				</Text>

				{
					loading ?
						<View style={spinnerStyles.spinnerStyle}>
							<Spinner color="indigo.500" size="lg" />
						</View> :
						<>
							<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
								<Modal.Content maxWidth="400px" p="2">
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
										<FormControl mt="3">
											<FormControl.Label>Email</FormControl.Label>
											<Input onChangeText={(emailBusqueda) => setEmailBusqueda(emailBusqueda)} />
										</FormControl>
									</Modal.Body>
									<Modal.Footer>
										<Button.Group space={2}>
											<Button
												variant="ghost"
												colorScheme="indigo"
												onPress={() => {
													setShowModal(false);
												}}
											>
												Cancelar
											</Button>
											<Button
												colorScheme="indigo"
												onPress={() => {
													this.onSubmit();
													setShowModal(false);
													setNombre('');
													setApellido('');
													setEmail('');
												}}
											>
												Buscar
											</Button>
										</Button.Group>
									</Modal.Footer>
								</Modal.Content>
							</Modal>
							<Basic listData={users} navigation={navigation} />
						</>
				}
			</Box>
		</NativeBaseProvider>
	);
}

function Basic({ listData, navigation }) {

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

			< Pressable onPress={() => console.log('You touched me')} bg="white">
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
						color="coolGray.800" onPress={() => navigation.navigate('Perfil', { email: data.item.email })}
					/>
					<Text fontSize="xs" fontWeight="medium" color="coolGray.800" onPress={() => navigation.navigate('Perfil', { email: data.item.email })}>
						Ver
					</Text>

				</VStack>
			</Pressable>
			<Pressable
				w="70"
				bg="indigo.500"
				justifyContent="center"
				onPress={() => navigation.navigate('Chat', { email: data.item.email, id: data.item.user_id })}
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
				previewOpenDelay={1000}
				onRowDidOpen={onRowDidOpen}
				initialNumToRender={10}
				keyExtractor={(item, index) => index.toString()}
			/>
		</Box>
	);
}


Basic.propTypes = {
	listData: PropTypes.array,
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
		goBack: PropTypes.func,
	}).isRequired,
	route: PropTypes.object
};

Contactscreen.propTypes = {
	navigation: PropTypes.object,
};


const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});



