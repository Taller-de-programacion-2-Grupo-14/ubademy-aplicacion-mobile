import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Spinner,
	FlatList,
	Link,
	Flex,
	Text,
	Menu,
	Pressable
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { examenesACorregir } from '../src/services/examenesACorregir';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

ExamenesScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function ExamenesScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [examenes, setExamenes] = React.useState([]);
	const [estado, setEstado] = React.useState('Todos');
	const isFocused = useIsFocused();

	const renderItem = ({ item }) => (
		<Link onPress={() => navigation.navigate('CorregirExamenScreen', item) }>
			<Box bg="#C042E2" p="5" rounded="8" style={{ width: 350, marginVertical: 25}}>
				<Heading color="cyan.50" mt="2" fontWeight="medium" fontSize="lg" bold>
					{item.nombre}
				</Heading>
				<Flex>
					<Text mt="2" fontSize="xs" fontWeight="medium" color="cyan.50">
						Alumno: {item.nombre_alumno}
					</Text>
				</Flex>
			</Box>
		</Link>
	);

	function filtrar(filtro) {
		setEstado(filtro);
		examenesACorregir(String(route.params.id), filtro)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				setExamenes(json.message);
			});
	}

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			examenesACorregir(String(route.params.id), estado)
				.then(data => data.json())
				.then(json => {
					console.log(json);
					setExamenes(json.message);
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
								<Menu.OptionGroup defaultValue={estado} title="Exámenes" type="radio">
									<Menu.ItemOption onPress={() => filtrar('Todos')} value="Todos">Todos</Menu.ItemOption>
									<Menu.ItemOption onPress={() => filtrar('a corregir')} value="a corregir">A corregir</Menu.ItemOption>
									<Menu.ItemOption onPress={() => filtrar('corregidos')} value="corregidos">Corregidos</Menu.ItemOption>
								</Menu.OptionGroup>
							</Menu>
						</Box>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<Heading size="xl" color="coolGray.800" fontWeight="600" bold>
								Lista de exámenes
							</Heading>
							<FlatList
								data={examenes}
								renderItem={renderItem}
								keyExtractor={item => String(item.id_exam)}
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

export default ExamenesScreen;
