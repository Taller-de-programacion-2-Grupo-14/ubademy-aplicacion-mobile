import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Spinner,
	Button,
	VStack,
	HStack,
	Stack,
	Text,
	Center,
	Link,
	StatusBar,
	FlatList,
	AspectRatio,
	Image
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { obtenerUsuario } from '../src/services/obtenerUsuario';
import { obtenerUltimosCursos } from '../src/services/obtenerCursos';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
	const [firstName, setFirstName] = React.useState('');
	const [ultimosCursos, setUltimosCursos] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [subscripcion, setSubscripcion] = React.useState('');
	const isFocused = useIsFocused();


	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			obtenerUsuario()
				.then(data => data.json())
				.then(json => {
					console.log(json);
					setFirstName(json.first_name);
					if (json.subscription === 'free') {
						console.log('es free entonces le pongo basico');
						setSubscripcion('BASICA');
					}
					if (json.subscription === 'platinum') {
						console.log('es platinum entonces le pongo estandard');
						setSubscripcion('STANDARD');
					}
					if (json.subscription === 'black') {
						console.log('es black entonces le pongo premium');
						setSubscripcion('PREMIUM');
					}
					SecureStore.setItemAsync('user_email', json.email);
				});
			obtenerUltimosCursos().then(data => data.json())
				.then(json => {
					console.log(json);
					console.log(json.message);
					setUltimosCursos(json.message);
					setLoading(false);
				});
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [isFocused])
	);

	return (

		<NativeBaseProvider>
			{
				loading ?
					<View style={spinnerStyles.spinnerStyle}>
						<Spinner color="indigo.500" size="lg" />
					</View> :

					<Box bg="#fff" p="2">
						<StatusBar backgroundColor="#000" barStyle="light-content" />

						<Box safeAreaTop backgroundColor="indigo.500" />

						<HStack bg="indigo.500" px="1" py="3" style={{ justifyContent: 'center' }} alignItems='center'>
							<Text color="white" p="2" fontSize="20" fontWeight='bold'>Hola {firstName.toUpperCase()}</Text>
						</HStack>
						<Box
							mt="7"
							bg="warmGray.50"
							overflow="hidden"
							borderColor="coolGray.200"
							borderWidth="1"
							rounded="md"
							w="100%"
							h="100"
							_text={{
								color: 'gray',
							}}
							p="5"
						>
							<HStack >
								<Text fontSize="md">Tu nivel de suscripcion es </Text>
								<Text fontSize="md" bold >{subscripcion}</Text>
							</HStack>
							<Link onPress={() => navigation.navigate('Subscripcion')}
								_text={{ fontSize: 'xs', fontWeight: '500', color: 'indigo.500' }}
								alignSelf="flex-start"
								mt="1">
								Quiero cambiar mi suscripcion
							</Link>
						</Box>
						<Heading p="3" size="lg">ULTIMOS CURSOS</Heading>
						<Heading p="3" size="sm">Te mostramos los cursos mas recientes de Ubademy.</Heading>


						<FlatList
							data={ultimosCursos}
							renderItem={({ item }) => (
								<Center flex={1} px="3" m="3">
									<Box
										rounded="lg"
										overflow="hidden"
										borderColor="coolGray.200"
										borderWidth="1"
										_dark={{
											borderColor: 'coolGray.600',
											backgroundColor: 'gray.700',
										}}
										_web={{
											shadow: 2,
											borderWidth: 0,
										}}
										_light={{
											backgroundColor: 'gray.50',
										}}
									>
										<Box>
											<AspectRatio w="100%" ratio={16 / 6}>
												<Image
													source={{
														uri: item.profile_pic_url,
													}}
													alt="image"
												/>
											</AspectRatio>
											<Center
												bg="violet.500"
												_dark={{
													bg: 'violet.400',
												}}
												_text={{
													color: 'warmGray.50',
													fontWeight: '700',
													fontSize: 'xs',
												}}
												position="absolute"
												bottom="0"
												px="3"
												py="1.5"
											>
												{item.subscription.toUpperCase()}
											</Center>
										</Box>
										<Stack p="4" space={3}>
											<Stack space={2}>
												<Heading size="md" ml="-1">
													{item.name}
												</Heading>
												<Text
													fontSize="xs"
													_light={{
														color: 'violet.500',
													}}
													_dark={{
														color: 'violet.400',
													}}
													fontWeight="500"
													ml="-0.5"
													mt="-1"
												>
													Dictado por {item.creator_first_name} {item.creator_last_name}
												</Text>
											</Stack>
											<Text isTruncated fontWeight="400">
												{item.description}
											</Text>
										</Stack>
									</Box>
								</Center>
							)}
							keyExtractor={(item, index) => index.toString()}
						/>
					</Box>
			}
		</NativeBaseProvider >
	);
}

HomeScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
};


const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
