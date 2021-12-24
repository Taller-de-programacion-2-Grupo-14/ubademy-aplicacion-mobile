import React from 'react';
import { obtenerCursos } from '../src/services/obtenerCursos';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Link,
	Text,
	FlatList,
	Modal,
	VStack,
	Button,
	HStack,
	Heading,
	Spinner,
	AspectRatio,
	Image,
	Center,
	Stack
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

ElegirCursoScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function ElegirCursoScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [cursos, setCursos] = React.useState([]);
	const [showModal, setShowModal] = React.useState(false);
	const [message, setMessage] = React.useState('');

	const renderItem = ({ item }) => (
		<Link onPress={() => navigation.navigate('CondicionesScreen', item)}>
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
						{(item.subscription == 'basico' || item.subscription == 'básico' || item.subscription == 'Basico') ? 'Básico' :
							((item.subscription == 'estandar' || item.subscription == 'estándar' || item.subscription == 'Estandar') ? 'Estándar' : 'Premium')
						}
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
							{item.type}
						</Text>
					</Stack>
					<Text fontWeight="400">
						Ver condiciones
					</Text>
				</Stack>
			</Box>

		</Link>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			obtenerCursos(route.params.tipo, route.params.suscripcion, route.params.textoLibre)
				.then((response) => response.json())
				.then((json) => {
					console.log(json);
					if (json.status === 204) {
						setMessage('Busqueda sin resultados');
						setShowModal(true);
					} else {
						if (json.status === 503) {
							setMessage('courses service is currently unavailable, please try later');
							setShowModal(true);
						} else {
							//setCursos(json);
							setCursos(json.message);
						}
					}
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
										onPress={() => { setShowModal(false); navigation.goBack(); }}
									>
										Continuar
									</Button>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<Heading size="xl" color="coolGray.800" fontWeight="600" bold>
								Elegir un curso
							</Heading>
							<FlatList
								data={cursos}
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

export default ElegirCursoScreen;
