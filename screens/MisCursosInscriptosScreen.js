import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Spinner,
	Text,
	Flex,
	FlatList,
	HStack,
	Spacer,
	Link
} from 'native-base';
import { misCursosInscriptos } from '../src/services/misCursosInscriptos';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

MisCursosInscriptosScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
};

function MisCursosInscriptosScreen({ navigation }) {
	const [loading, setLoading] = React.useState(true);
	const [cursos, setCursos] = React.useState([]);

	const renderItem = ({ item }) => (
		<Link onPress={() => navigation.navigate('MiCursoInscriptoScreen', item) }>
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
			misCursosInscriptos()
				.then((response) => response.json())
				.then((json) => {
					setLoading(false);
					setCursos(json);
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
							Cursos en los que estoy inscripto
						</Heading>
						<FlatList
							data={cursos}
							renderItem={renderItem}
							keyExtractor={item => item.course_name}
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

export default MisCursosInscriptosScreen;
