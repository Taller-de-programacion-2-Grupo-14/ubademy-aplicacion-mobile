import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Center,
	Heading,
	Spinner,
	useTheme,
	VStack
} from 'native-base';

import { obtenerUsuario } from '../src/services/obtenerUsuario';
import { useFocusEffect } from '@react-navigation/native';


export default function HomeScreen() {
	const [firstName, setFirstName] = React.useState('');
	const [loading, setLoading] = React.useState(true);
	const { colors } = useTheme();

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			obtenerUsuario()
				.then(data => data.json())
				.then(json => {
					console.log(json);
					setFirstName(json.first_name);
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


					<Center flex={1} px="3">
						<Center mt="8" mb="4">
							<Heading fontSize="xl"> Violet</Heading>
						</Center>
						<VStack flex="1">
							{Object.keys(colors.violet).map((key, index) => {
								if (index >= 1 && index <= 5)
									return (
										<Center py="4" bg={`violet.${key}`}>
											{key}
										</Center>
									)
							})}
						</VStack>
					</Center>

			}
		</NativeBaseProvider >
	);
}

const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
