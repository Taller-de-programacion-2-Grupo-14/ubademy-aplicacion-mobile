import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Spinner,
	FlatList,
	Divider,
	Image
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerMultimedia } from '../src/services/obtenerMultimedia';
import PropTypes from 'prop-types';
import { Video } from 'expo-av';

VerMultimediaScreen.propTypes = {
	route: PropTypes.object.isRequired,
};

function VerMultimediaScreen({ route }) {
	const [loading, setLoading] = React.useState(true);
	const [multimedia, setMultimedia] = React.useState([]);

	const renderItem = ({ item }) => (
		<>
			<Heading size="lg" color="coolGray.800" fontWeight="600" bold>
				{item.title}
			</Heading>
			{
				(item.tag=='video') ?
					<Video
						style={styles.video}
						source={{
							uri: item.url,
						}}
						useNativeControls
						resizeMode="contain"
						isLooping
					/> :
					<Image source={{ uri: item.url }} style={{ width: 400, height: 300, alignSelf: 'center' }} alt="multimedia" />
			}
			<Divider my="4" />
		</>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			obtenerMultimedia(String(route.params.id))
				.then(data => data.json())
				.then(json => {
					console.log(json);
					setMultimedia(json.message);
				});
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
								Contenido multimedia
							</Heading>
							<Divider my="4" />
							<FlatList
								data={multimedia}
								renderItem={renderItem}
								keyExtractor={(item, index) => index.toString()}
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

const styles = StyleSheet.create({
	video: {
		alignSelf: 'center',
		width: 320,
		height: 200,
	},
});

export default VerMultimediaScreen;
