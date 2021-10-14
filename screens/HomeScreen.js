import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
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
	HStack,
	Center,
	Pressable,
	Menu,
	HamburgerIcon,
	Spinner
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { IconButton, StatusBar } from 'native-base';
import { obtenerUsuario } from '../src/services/obtenerUsuario';
import { useFocusEffect } from '@react-navigation/native';
import showAlert from './PopUp';
import * as SecureStore from 'expo-secure-store';

export function hardLogout(navigation) {
	navigation.navigate('LoginScreen');
	SecureStore.deleteItemAsync('secure_token').then(() => console.log('token deleted'));
}

export function Example({navigation}) {
	return (

		<Menu
			w="190"
			trigger={(triggerProps) => {
				return (
					<Pressable accessibilityLabel="More options menu" {...triggerProps}>
						<HamburgerIcon color='white'/>
					</Pressable>
				);
			}}
		>

			<Menu.Item onPress={() => {
				showAlert(() => hardLogout(navigation));
			}}>
				<Text> Eliminar cuenta</Text>

			</Menu.Item>

			<Menu.Item onPress={()=>hardLogout(navigation)}>Salir</Menu.Item>
		</Menu>

	);
}

export default function HomeScreen({ navigation }) {
	const [selected, setSelected] = React.useState(1);
	const [firstName, setFirstName] = React.useState('');
	const [loading, setLoading] = React.useState(true);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			setLoading(false);
			obtenerUsuario()
				.then(data => data.json())
				.then(json => {
					console.log(json);
					setFirstName(json.first_name);
				});
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);

	return (

		<NativeBaseProvider>
			<StatusBar backgroundColor="white" barStyle="light-content" />

			<Box safeAreaTop backgroundColor="#109bd6" />

			<HStack bg="indigo.500" px="1" py="3" justifyContent='space-between' alignItems='center'>
				<HStack space="4" alignItems='center'>
					<Example />
					<Text color="white" fontSize="20" >Home</Text>
				</HStack>
				<HStack space="2">
					<IconButton icon={<Icon as={<MaterialIcons name='favorite' />} size='sm' color="white" />} />
					<IconButton icon={<Icon as={<MaterialIcons name='search' />}
						color="white" size='sm' />} />
					<IconButton icon={<Icon as={<MaterialIcons name='more-vert' />} size='sm' color="white" />} />
				</HStack>
			</HStack>
			{
				loading ?
					<View style={spinnerStyles.spinnerStyle}>
						<Spinner color="indigo.500" size="lg" />
					</View> :
					<Box safeArea flex={7} p="2" py="8" w="90%" mx="auto" style={{ justifyContent: 'center' }}>
						<Heading size="lg" fontWeight="600" color="coolGray.800" >
                            Bienvenido {firstName}
						</Heading>
					</Box>
			}
			<Box flex={1} bg="white" safeAreaTop>
				<Center flex={1}></Center>
				<HStack bg="indigo.500" alignItems="center" safeAreaBottom shadow={6}>
					<Pressable
						opacity={selected === 0 ? 1 : 0.5}
						py="3"
						flex={1}
						onPress={() => setSelected(0)}>
						<Center>
							<Icon
								mb="1"
								as={
									<MaterialCommunityIcons
										name={selected === 0 ? 'home' : 'home-outline'}
									/>
								}
								color="white"
								size="sm"
							/>
							<Text color="white" fontSize="12">
                                Home
							</Text>
						</Center>
					</Pressable>
					<Pressable
						opacity={selected === 1 ? 1 : 0.5}
						py="2"
						flex={1}
						onPress={() => setSelected(1)}
					>
						<Center>
							<Icon
								mb="1"
								as={<MaterialIcons name="search" />}
								color="white"
								size="sm"
							/>
							<Text color="white" fontSize="12">
                                Buscar
							</Text>
						</Center>
					</Pressable>
					<Pressable
						opacity={selected === 2 ? 1 : 0.6}
						py="2"
						flex={1}
						onPress={() => setSelected(2)}
					>
						<Center>
							<Icon
								mb={1}
								as={
									<MaterialCommunityIcons
										name={selected === 2 ? 'book-open' : 'book-open-outline'}
									/>
								}
								color="white"
								size="sm"
							/>
							<Text color="white" fontSize={12}>
                                Cursos
							</Text>
						</Center>
					</Pressable>
					<Pressable
						opacity={selected === 3 ? 1 : 0.5}
						py="2"
						flex={1}
						onPress={() => setSelected(3)}
					>
						<Center>
							<Icon
								mb={1}
								as={
									<MaterialCommunityIcons
										name={selected === 3 ? 'account' : 'account-outline'}
									/>
								}
								color="white"
								size="sm"
								onPress={() => navigation.navigate('UpdateUsuarioScreen')}
							/>
							<Text color="white" fontSize="12">
                                Perfil
							</Text>
						</Center>
					</Pressable>
				</HStack>
			</Box>
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