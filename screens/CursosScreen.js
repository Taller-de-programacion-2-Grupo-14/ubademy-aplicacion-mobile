import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CrearCursoScreen from './CrearCursoScreen';
import InscribirmeScreen from './InscribirmeScreen';
import SerColaboradorScreen from './SerColaboradorScreen';
import { misCursos } from '../src/services/misCursos';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Text,
	Flex,
	FlatList,
	HStack,
	Spacer,
	Link,
	ScrollView,
	Spinner,
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

CursosHome.propTypes = {
	navigation: PropTypes.object.isRequired,
};

function CursosHome({ navigation }) {
	const [loading, setLoading] = React.useState(true);
	const [cursos, setCursos] = React.useState([]);

	const renderItem = ({ item }) => (
		<Link onPress={() => navigation.navigate('CondicionesScreen', item) }>
			<Box bg="#109bd6" p="5" rounded="8" style={{ width: 350, marginVertical: 25}}>
				<HStack alignItems="flex-start">
					<Text fontSize="xs" color="cyan.50" fontWeight="medium">
						{item.tipo}
					</Text>
					<Spacer />
				</HStack>
				<Heading color="cyan.50" mt="2" fontWeight="medium" fontSize="lg">
					{item.course_name}
				</Heading>
				<Flex>
					<Text mt="2" fontSize="xs" fontWeight="medium" color="cyan.400">
						Ingresar
					</Text>
				</Flex>
			</Box>
		</Link>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			misCursos()
				.then((response) => response.json())
				.then((json) => {
					setLoading(false);
					setCursos(json)
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
					<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
						<FlatList
							data={cursos}
							renderItem={renderItem}
							keyExtractor={item => item.course_name}
						/>
					</Box>
			}
		</NativeBaseProvider >
	);
}

const Drawer = createDrawerNavigator();

export default function CursosApp() {
	return (
		<Drawer.Navigator initialRouteName="CursosHome">
			<Drawer.Screen name="Mis cursos" component={CursosHome} />
			<Drawer.Screen name="Inscribirme a un curso" component={InscribirmeScreen} />
			<Drawer.Screen name="Crear un curso" component={CrearCursoScreen} />
			<Drawer.Screen name="Ser colaborador de un curso" component={SerColaboradorScreen} />
		</Drawer.Navigator>
	);
}

const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
