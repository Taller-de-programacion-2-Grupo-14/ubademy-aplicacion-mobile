import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Spinner,
	Button
} from 'native-base';
import * as SecureStore from 'expo-secure-store';
import { obtenerUsuario } from '../src/services/obtenerUsuario';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
	const [firstName, setFirstName] = React.useState('');
	const [loading, setLoading] = React.useState(true);
	const isFocused = useIsFocused();

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			console.log('en home screen');
			obtenerUsuario()
				.then(data => data.json())
				.then(json => {
					console.log(json);
					setFirstName(json.first_name);
					SecureStore.setItemAsync('user_email', json.email);
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
			<Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
				{
					loading ?
						<View style={spinnerStyles.spinnerStyle}>
							<Spinner color="indigo.500" size="lg" />
						</View> :
						<Box safeArea flex={8} p="2" py="8" w="90%" mx="auto" style={{ justifyContent: 'center' }}>
							<Heading size="lg" fontWeight="600" color="coolGray.800" >
								Bienvenido {firstName}
							</Heading>
							<Button colorScheme="indigo"
								flex="1"
								onPress={() => {
									navigation.navigate('Subscripcion');
								}}
							>
								Continuar
							</Button>
						</Box>
				}
			</Box>
		</NativeBaseProvider >
	);
}

HomeScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
};


const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
