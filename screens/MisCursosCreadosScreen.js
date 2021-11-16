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
	const [error, setError] = React.useState(false);
	const isFocused = useIsFocused();

	const renderItem = ({ item }) => (
		<Link onPress={() => {item['verComoCreador'] = true; navigation.navigate('MiCursoCreadoScreen', item);} }>
			<Box bg="#109bd6" p="5" rounded="8" style={{ width: 350, marginVertical: 25}}>
				<HStack alignItems="flex-start">
					<Text fontSize="xs" color="cyan.50" fontWeight="medium">
						{item.type}
					</Text>
					<Spacer />
				</HStack>
				<Heading color="cyan.50" mt="2" fontWeight="medium" fontSize="lg">
					{item.name}
				</Heading>
				<Flex>
					<Text mt="2" fontSize="xs" fontWeight="medium" color="cyan.800">
            Ingresar
					</Text>
				</Flex>
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
					if (json.status === 503) {
						setMessage('courses service is currently unavailable, please try later');
						setError(true);
						setShowModal(true);
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
										onPress={() => {
											error ? setShowModal(false) : navigation.goBack();
										}}
									>
										Continuar
									</Button>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<Heading size="lg" color="coolGray.800" fontWeight="600">
								Cursos creados por mi
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

export default MisCursosCreadosScreen;
