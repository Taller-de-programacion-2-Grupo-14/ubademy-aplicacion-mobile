import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Spinner,
	FlatList,
	Divider,
	Button,
	Modal,
	VStack,
	HStack,
	Text
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { publicarExamen } from '../src/services/publicarExamen';
import PropTypes from 'prop-types';
import { useState } from 'react';

VerExamenScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function VerExamenScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [preguntas, setPreguntas] = React.useState([]);
	const [showModal, setShowModal] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const [mostrar, setMostrar] = useState(true);
	const [publicado, setPublicado] = useState(false);
	const isFocused = useIsFocused();

	const renderItem = ({ item }) => (
		<>
			<Heading size="lg" color="coolGray.800" fontWeight="600" >
				{item}
			</Heading>
			<Divider my="5" />
		</>
	);

	useFocusEffect(
		React.useCallback(() => {
			if (route.params.verComoCreador) {
				setMostrar(true);
			} else {
				setMostrar(false);
			}
			if (route.params.status=='published'){
				setPublicado(true);
			} else {
				setPublicado(false);
			}
			setPreguntas(route.params.questions);
			setLoading(false);
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [isFocused])
	);

	this.publicar = () => {
		publicarExamen(route.params.id_course, route.params.title)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				if (json.status === 200) {
					setMessage('¡Publicación exitosa!');
				} else {
					setError(true);
					setMessage('Error en la publicación del exámen');
				}
				setShowModal(true);
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
							<Heading size="xl" color="coolGray.800" fontWeight="600" bold>
								{route.params.title}
							</Heading>
							<Box safeArea flex={1} w="95%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
								<FlatList
									data={preguntas}
									renderItem={renderItem}
									keyExtractor={(item, index) => index.toString()}
								/>
							</Box>
							{mostrar ?
								<Button mt="2" isDisabled={publicado} colorScheme="indigo" _text={{ color: 'white' }} onPress={() => { navigation.navigate('EditarExamenScreen', route.params); }}>
									Editar exámen
								</Button> :
								null
							}
							{mostrar ?
								<Button mt="2" isDisabled={publicado} colorScheme="indigo" _text={{ color: 'white' }} onPress={() => this.publicar()} >
									Publicar
								</Button> :
								null
							}
							{mostrar ?
								<Text color={!publicado ? 'transparent' : '#EB0202'} style={{ textAlign: 'center' }}>
									El exámen ya ha sido publicado
								</Text> :
								null
							}
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

export default VerExamenScreen;
