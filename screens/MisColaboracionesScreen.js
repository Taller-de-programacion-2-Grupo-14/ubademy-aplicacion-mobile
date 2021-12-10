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
	Flex,
	FlatList,
	HStack,
	Spacer,
	Link
} from 'native-base';
import { misColaboraciones } from '../src/services/misColaboraciones';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

MisColaboracionesScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
};

function MisColaboracionesScreen({ navigation }) {
	const [loading, setLoading] = React.useState(true);
	const [cursos, setCursos] = React.useState([]);
	const [showModal, setShowModal] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [bloqueado, setBloqueado] = React.useState(false);
	const isFocused = useIsFocused();

	const renderItem = ({ item }) => (
		<Link onPress={() => {item['verComoCreador'] = false; navigation.navigate('MiCursoColaboradorScreen', item);} }>
			<Box bg="#109bd6" p="5" rounded="8" style={{ width: 350, marginVertical: 25}}>
				<HStack alignItems="flex-start">
					<Text fontSize="xs" color="cyan.50" fontWeight="medium" bold>
						{item.type}
					</Text>
					<Spacer />
				</HStack>
				<Heading color="cyan.50" mt="2" fontWeight="medium" fontSize="lg" bold>
					{item.name}
				</Heading>
				<Flex>
					<Text mt="2" fontSize="xs" fontWeight="medium" color="cyan.800" bold>
            Ingresar
					</Text>
				</Flex>
			</Box>
		</Link>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			misColaboraciones()
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
						<Modal isOpen={showModal} onClose={() => {if (bloqueado) {navigation.navigate('LoginScreen');} setShowModal(false);}} size="lg">
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
								Cursos en los que soy colaborador
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

export default MisColaboracionesScreen;
