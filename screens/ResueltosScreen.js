import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Spinner,
	Link,
	Flex,
	Text,
	FlatList
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { examenesACorregir } from '../src/services/examenesACorregir';
import PropTypes from 'prop-types';

ResueltosScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function ResueltosScreen({ navigation, route }) {
	const [loading, setLoading] = React.useState(true);
	const [examenes, setExamenes] = React.useState([]);

	const renderItem = ({ item }) => (
		<Link onPress={() => navigation.navigate('ExamenResueltoScreen', item) }>
			<Box bg="#C042E2" p="5" rounded="8" style={{ width: 350, marginVertical: 25}}>
				<Heading color="cyan.50" mt="2" fontWeight="medium" fontSize="lg" bold>
					{item.exam_name}
				</Heading>
				<Flex>
					<Text mt="2" fontSize="xs" fontWeight="medium" color="cyan.50">
            Ingresar
					</Text>
				</Flex>
			</Box>
		</Link>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			examenesACorregir(String(route.params), 'Todos')
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
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<Heading size="xl" color="coolGray.800" fontWeight="600" bold>
								Exámenes resueltos
							</Heading>
							<FlatList
								data={examenes}
								renderItem={renderItem}
								keyExtractor={item => String(item.exam_id)}
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

export default ResueltosScreen;
