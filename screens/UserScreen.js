import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UpdateUsuarioScreen from './UpdateUsuarioScreen';
import { useIsFocused } from '@react-navigation/native';
import {
	NativeBaseProvider,
	Box,
	Text,
	Heading,
	FormControl,
	Button,
	ScrollView,
	Spinner,
	Avatar,
	Stack,
	Center
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerUsuario } from '../src/services/obtenerUsuario';
import PropTypes from 'prop-types';
import showAlert from './PopUp';
import * as SecureStore from 'expo-secure-store';

UsuarioHome.propTypes = {
	navigation: PropTypes.object.isRequired,
};

export function HardLogout({ navigation }) {
	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			showAlert(() => {
				SecureStore.deleteItemAsync('secure_token').then(() => console.log('token deleted'));
				navigation.navigate('LoginScreen');
			}, navigation);
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);
	return null;
}

export function Logout({ navigation }) {
	useEffect(() => {
		SecureStore.deleteItemAsync('secure_token').then(() => console.log('token deleted'));
		navigation.navigate('LoginScreen');
	});
	return null;
}


function UsuarioHome({ navigation }) {
	const [firstName, setFirstName] = React.useState('');
	const [lastName, setLastName] = React.useState('');
	const [location, setLocation] = React.useState('');
	const [interest, setInetrests] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [loading, setLoading] = React.useState(true);
	const [photo_url, setPhoto_url] = React.useState('');
	const isFocused = useIsFocused();

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			obtenerUsuario()
				.then(data => data.json())
				.then(json => {
					setLoading(false);
					setFirstName(json.first_name);
					setLastName(json.last_name);
					setEmail(json.email);
					setInetrests(json.interest);
					setLocation(json.location);
					setPhoto_url(json.photo_url);
				});
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [isFocused])
	);


	return (

		<NativeBaseProvider>
			<Center flex={1} px="7">
				{
					loading ?
						<View style={spinnerStyles.spinnerStyle}>
							<Spinner color="indigo.500" size="lg" />
						</View> :

						<Box>
							<ScrollView
								_contentContainerStyle={{
									px: '20px',
									mb: '4',
								}}
							>
								<Stack p="4" space={4}>
									<Box>

										{console.log(photo_url)
										}
										{(photo_url === '' || photo_url === null || photo_url == 'undefined') ?
											< Avatar
												bg="indigo.600"
												alignSelf="center"
												size="2xl"
											>
												{firstName.charAt(0).toUpperCase()}
											</Avatar>
											:
											<Avatar
												alignSelf="center"
												size="2xl"
												source={{ uri: photo_url }}
											>
											</Avatar>
										}


									</Box>
									<Stack space={2}>
										<Heading size="md" ml="-1">
											Mis datos
										</Heading>
									</Stack>
									<Stack alignItems="center" space={4} justifyContent="space-between">

										<FormControl>
											<FormControl.Label
												_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
												Email
											</FormControl.Label>
											<Text fontSize="sm" > {email} </Text>
										</FormControl>
										<FormControl>
											<FormControl.Label
												_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
												Nombre
											</FormControl.Label>
											<Text fontSize="sm"> {firstName} </Text>
										</FormControl>
										<FormControl>
											<FormControl.Label
												_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
												Apellido
											</FormControl.Label>
											<Text fontSize="sm" > {lastName} </Text>
										</FormControl>

										<FormControl>
											<FormControl.Label
												_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
												Ubicacion
											</FormControl.Label>
											<Text fontSize="sm" > {location} </Text>
										</FormControl>

										<FormControl>
											<FormControl.Label
												_text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
												Tipo de curso de mayor interes
											</FormControl.Label>
											<Text fontSize="sm" > {interest} </Text>
										</FormControl>
									</Stack>
								</Stack>
								<Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => navigation.goBack()} >
									Volver
								</Button>
							</ScrollView>
						</Box>
				}
			</Center>
		</NativeBaseProvider >
	);
}





const Drawer = createDrawerNavigator();

export default function UsuarioApp() {
	return (
		<Drawer.Navigator initialRouteName="UsuarioHome">
			<Drawer.Screen name="Mi perfil" component={UsuarioHome} />
			<Drawer.Screen name="Modificar mi perfil" component={UpdateUsuarioScreen} />
			<Drawer.Screen name="Salir" component={Logout} />
			<Drawer.Screen name="Eliminar cuenta" component={HardLogout} />
		</Drawer.Navigator>
	);
}

const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});