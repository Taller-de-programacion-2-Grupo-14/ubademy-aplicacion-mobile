import React from 'react';
import { obtenerFavoritos } from '../src/services/obtenerFavoritos';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
	NativeBaseProvider,
	Box,
	Link,
	Pressable,
	Menu,
	Text,
	FlatList,
	Modal,
	VStack,
	Button,
	HStack,
	Spacer,
	Flex,
	Heading,
	Spinner
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

CursosFavoritosScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
};

function CursosFavoritosScreen({ navigation }) {
	const [loading, setLoading] = React.useState(true);
	const [cursos, setCursos] = React.useState([]);
	const [showModal, setShowModal] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [suscripcion, setSuscripcion] = React.useState('Todos');
	const isFocused = useIsFocused();

	const renderItem = ({ item }) => (
		<Link onPress={() => navigation.navigate('MiCursoFavoritoScreen', item) }>
			<Box bg="#109bd6" p="5" rounded="8" style={{ width: 350, marginVertical: 25}}>
				<HStack alignItems="flex-start">
					<Text fontSize="xs" color="cyan.50" fontWeight="medium" bold>
						{item.subscription}
					</Text>
					<Spacer />
				</HStack>
				<Heading color="cyan.50" mt="2" fontWeight="medium" fontSize="lg" bold>
					{item.name}
				</Heading>
				<Flex>
					<Text mt="2" fontSize="xs" fontWeight="medium" color="cyan.800" bold>
						Ver condiciones
					</Text>
				</Flex>
			</Box>
		</Link>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			obtenerFavoritos('')
				.then((response) => response.json())
				.then((json) => {
					console.log(json);
					if (json.status === 204) {
						setMessage('Busqueda sin resultados');
						setShowModal(true);
					} else {
						if (json.status === 503){
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
		}, [isFocused])
	);

	this.onSubmit = () => {
		if (suscripcion=='Todos') {
			setSuscripcion('');
		}
		obtenerFavoritos(suscripcion)
			.then((response) => response.json())
			.then((json) => {
				setCursos(json.message);
				setLoading(false);
			});
	};

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
						<Box style={{position: 'absolute', top: 20, right: 20}}>
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
								<Menu.OptionGroup defaultValue={suscripcion} title="Cursos" type="radio">
									<Menu.ItemOption onPress={() => {setSuscripcion('Todos'); this.onsubtmit;}} value="Todos">Todos</Menu.ItemOption>
									<Menu.ItemOption onPress={() => {setSuscripcion('Basico'); this.onsubtmit;}} value="Basico">Basico</Menu.ItemOption>
									<Menu.ItemOption onPress={() => {setSuscripcion('Estandar'); this.onsubtmit;}} value="Estandar">Estandar</Menu.ItemOption>
									<Menu.ItemOption onPress={() => {setSuscripcion('Premium'); this.onsubtmit;}} value="Premium">Premium</Menu.ItemOption>
								</Menu.OptionGroup>
							</Menu>
						</Box>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<Heading size="lg" color="coolGray.800" fontWeight="600">
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

export default CursosFavoritosScreen;
