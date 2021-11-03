import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	VStack,
	Center,
	Stack,
	Button,
	Spinner
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

MisCursosScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
};

function MisCursosScreen({ navigation }) {
	const [loading, setLoading] = React.useState(true);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
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
					<Center flex={1} px="3">
						<VStack
							w="100%"
							space={2.5}
							px="2"
							mt="4"
							alignItems="center"
							justifyContent="center"
						>
							<Stack
								mb="2.5"
								mt="1.5"
								direction={{
									base: 'column',
									md: 'row',
								}}
								space={10}
								mx={{
									base: 'auto',
									md: '0',
								}}
							>
								<Button
									size="lg" onPress={() => navigation.navigate('MisCursosCreadosScreen')}
								>
									Cursos creados por mi
								</Button>
								<Button
									size="lg"
									colorScheme="secondary" onPress={() => navigation.navigate('MisCursosInscriptosScreen')}
								>
									Cursos en los que estoy inscripto
								</Button>
							</Stack>
						</VStack>
					</Center>
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

export default MisCursosScreen;
