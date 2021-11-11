import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	FlatList,
	Text,
	Heading,
	Spinner
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerAlumnos } from '../src/services/obtenerAlumnos';
import PropTypes from 'prop-types';

ListadoAlumnosScreen.propTypes = {
	route: PropTypes.object.isRequired,
};

//function ListadoAlumnosScreen({ navigation }) {
function ListadoAlumnosScreen({ route }) {
	const [loading, setLoading] = React.useState(true);
	const [alumnos, setAlumnos] = React.useState([]);

	const renderItem = ({ item }) => (
		<Text fontSize="md">
			{item.apellido}, {item.nombre}
		</Text>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			obtenerAlumnos(route.params)
				.then((response) => response.json())
				.then((json) => {
					setLoading(false);
					setAlumnos(json);
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
						<Heading size="lg" color="coolGray.800" fontWeight="600">
							Listado de alumnos{'\n'}
						</Heading>
						<FlatList
							data={alumnos}
							renderItem={renderItem}
							keyExtractor={item => item.id}
 						/>
					</Box>
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

export default ListadoAlumnosScreen;
