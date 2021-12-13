import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Spinner,
	Divider,
	FlatList
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

ExamenResueltoScreen.propTypes = {
	//navigation: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};

function ExamenResueltoScreen({ route }) {
	const [loading, setLoading] = React.useState(true);
	const [preguntas, setPreguntas] = React.useState([]);
	const [respuestas, setRespuestas] = React.useState([]);

	const renderItem = ({ item, index }) => (
		<>
			<Heading size="lg" color="coolGray.800" fontWeight="600" bold>
				Pregunta:
			</Heading>
			<Heading size="lg" color="coolGray.800" fontWeight="600" >
				{item}
			</Heading>
			<Heading size="lg" color="coolGray.800" fontWeight="600" bold>
				Respuesta:
			</Heading>
			<Heading size="lg" color="coolGray.800" fontWeight="600" >
				{respuestas[index]}
			</Heading>
			<Divider my="5" />
		</>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			setPreguntas(route.params.questions);
			setRespuestas(route.params.answers);
			setLoading(false);
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
								{route.params.exam_name}
							</Heading>
							<Box safeArea flex={1} w="95%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
								<FlatList
									data={preguntas}
									//extraData={respuestas}
									renderItem={renderItem}
									keyExtractor={(item, index) => index.toString()}
								/>
							</Box>
							<Heading size="md" color="coolGray.800" fontWeight="600" bold>
								Estado:
							</Heading>
							<Heading size="md" color="coolGray.800" fontWeight="600">
								{route.params.status}
							</Heading>
							<Heading size="md" color="coolGray.800" fontWeight="600" bold>
								Observaciones:
							</Heading>
							<Heading size="md" color="coolGray.800" fontWeight="600">
								{route.params.correction}
							</Heading>
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

export default ExamenResueltoScreen;
