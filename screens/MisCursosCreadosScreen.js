import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Spinner,
	Modal,
	VStack,
	Button,
	Text,
	FlatList,
	HStack,
	AspectRatio,
	Image,
	Stack,
	Link,
	Center
} from 'native-base';
import { misCursosCreados } from '../src/services/misCursosCreados';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

MisCursosCreadosScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
};

function MisCursosCreadosScreen({ navigation }) {
	const [loading, setLoading] = React.useState(true);
	const [cursos, setCursos] = React.useState([]);
	const [showModal, setShowModal] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [bloqueado, setBloqueado] = React.useState(false);
	const isFocused = useIsFocused();

	const renderItem = ({ item }) => (
		<Link onPress={() => { item['verComoCreador'] = true; navigation.navigate('MiCursoCreadoScreen', item); }}>

			<Box
				rounded="lg"
				m="2"
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
							{item.type}
						</Text>
					</Stack>
					<Text fontWeight="400">
						Ingresar
					</Text>
				</Stack>
			</Box>
		</Link>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			misCursosCreados()
				.then((response) => response.json())
				.then((json) => {
					console.log(json);
					switch (json.status) {
					case 503:
						setMessage('courses service is currently unavailable, please try later');
						setShowModal(true);
						break;
					case 403:
						setMessage('Usuario bloqueado');
						setBloqueado(true);
						setShowModal(true);
						break;
					case 401:
						setMessage('Token expirado');
						setShowModal(true);
						break;
					default:
						setCursos(json.message);
					}
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
					<>
						<Modal isOpen={showModal} onClose={() => { if (bloqueado) { navigation.navigate('LoginScreen'); } setShowModal(false); }} size="lg">
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
											setShowModal(false);
										}}
									>
										Continuar
									</Button>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<Heading size="lg" color="coolGray.800" fontWeight="600" bold>
								Cursos creados por mi
							</Heading>
							<Center flex={1} px="3">
								<FlatList
									data={cursos}
									renderItem={renderItem}
									keyExtractor={item => String(item.id)}
								/>
							</Center>
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

export default MisCursosCreadosScreen;
