import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Spinner
} from 'native-base';

import { obtenerUsuario } from '../src/services/obtenerUsuario';
import { useFocusEffect } from '@react-navigation/native';


export default function HomeScreen() {
	const [firstName, setFirstName] = React.useState('');
	const [loading, setLoading] = React.useState(true);

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
					<Box safeArea flex={8} p="2" py="8" w="90%" mx="auto" style={{ justifyContent: 'center' }}>
						<Heading size="lg" fontWeight="600" color="coolGray.800" >
                            Bienvenido {firstName}
						</Heading>
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
