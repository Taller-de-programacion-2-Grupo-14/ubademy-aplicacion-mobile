import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Pressable,
	Menu,
	Modal,
	FlatList,
	Text,
	VStack,
	HStack,
	Button,
	Spinner,
	Link,
	Spacer,
	Flex,
	Stack,
	AspectRatio,
	Image
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { historialDeCursos } from '../src/services/historialDeCursos';
import PropTypes from 'prop-types';

HistoricoDeCursosScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
};

function HistoricoDeCursosScreen({ navigation }) {
	const [loading, setLoading] = React.useState(true);
	const [cursos, setCursos] = React.useState([]);
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const [showModalError, setShowModalError] = React.useState(false);
	const isFocused = useIsFocused();
	const [estado, setEstado] = React.useState('Todos');

	const renderItem = ({ item }) => (
		<Link onPress={() => { item['verComoCreador'] = false; navigation.navigate('MiCursoInscriptoScreen', item); }}>
			<Box
				maxW="80"
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
					<AspectRatio w="100%" ratio={16 / 9}>
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

	function filtrar(filtro) {
		setEstado(filtro);
		historialDeCursos(filtro)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				if (json.status === 503) {
					setMessage('courses service is currently unavailable, please try later');
					setError(true);
					setShowModalError(true);
				} else {
					setCursos(json.message);
				}
			});
	}

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			historialDeCursos(estado)
				.then((response) => response.json())
				.then((json) => {
					console.log(json);
					if (json.status === 503) {
						setMessage('courses service is currently unavailable, please try later');
						setError(true);
						setShowModalError(true);
					} else {
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
						<Modal isOpen={showModalError} onClose={() => setShowModalError(false)} size="lg">
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
											error ? setShowModalError(false) : navigation.goBack();
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
								<Menu.OptionGroup defaultValue={estado} title="Cursos" type="radio">
									<Menu.ItemOption onPress={() => filtrar('Todos')} value="Todos">Todos</Menu.ItemOption>
									<Menu.ItemOption onPress={() => filtrar('aprobado')} value="aprobado">Aprobados</Menu.ItemOption>
									<Menu.ItemOption onPress={() => filtrar('desaprobado')} value="desaprobado">Desaprobados</Menu.ItemOption>
									<Menu.ItemOption onPress={() => filtrar('en curso')} value="en curso">En curso</Menu.ItemOption>
								</Menu.OptionGroup>
							</Menu>
						</Box>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center', top: 20 }}>
							<Heading size="xl" color="coolGray.800" fontWeight="600" bold >
								Histórico de cursos{'\n'}
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

export default HistoricoDeCursosScreen;
