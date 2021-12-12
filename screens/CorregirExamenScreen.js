import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	ScrollView,
	Spinner
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
//import PropTypes from 'prop-types';

// CorregirExamenScreen.propTypes = {
// 	navigation: PropTypes.object.isRequired,
// 	route: PropTypes.object.isRequired,
// };

function CorregirExamenScreen() {
//function CorregirExamenScreen({ navigation, route }) {
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
					<ScrollView
						_contentContainerStyle={{
							px: '20px',
							mb: '4',
						}}
					>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
							<Heading size="lg" color="coolGray.800" fontWeight="600">
								Corregir (por ahora nada)
							</Heading>
						</Box>
					</ScrollView>
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

export default CorregirExamenScreen;
