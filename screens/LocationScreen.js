import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { getLocation } from '../src/services/locationService';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native';
import PropTypes from 'prop-types';
import * as SecureStore from 'expo-secure-store';

navigator.geolocation = require('react-native-geolocation-service');

const MyMapView = (props) => {
	console.log('en mymapview');
	console.log(props.region);
	return (
		<MapView
			style={styles.container}
			region={props.region}
			showsUserLocation={true}
			scrollEnabled={false}
			onRegionChange={(reg) => props.onRegionChange(reg)}>

			<Marker
				coordinate={props.region} />
		</MapView>
	);
};


const MapInput = (props) => {

	return (

		<GooglePlacesAutocomplete
			placeholder='Ingrese ubicacion'
			minLength={2} // minimum length of text to search
			autoFocus={true}
			returnKeyType={'search'} // Can be left out for default return key 
			listViewDisplayed={false}    // true/false/undefined
			fetchDetails={true}
			onFail={(error) => console.error(error)}
			requestUrl={{
				url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
				useOnPlatform: 'web',
			}}
			onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
				console.log('los details');
				console.log(details);
				props.notifyChange(details.geometry.location, details.formatted_address);
			}
			}

			query={{
				key: 'AIzaSyChBqyOXHQRQ2WhKwTrrAcxQqaboAfxWCI',
				language: 'es'
			}}

			nearbyPlacesAPI='GooglePlacesSearch'
			debounce={300}
			currentLocation={true}
			currentLocationLabel='Ubicacion actual'
		/>
	);

};

const LocationScreen = ({ navigation }) => {

	const [state, setState] = React.useState({
		region: {}
	});
	const [address, setAddress] = React.useState('');

	useFocusEffect(
		React.useCallback(() => {
			getInitialState();
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);


	const getInitialState = () => {
		getLocation().then(
			(data) => {
				console.log(data);
				setState({
					region: {
						latitude: data.latitude,
						longitude: data.longitude,
						latitudeDelta: 0.003,
						longitudeDelta: 0.003
					}
				});
			}
		);
	};

	const getCoordsFromName = (loc) => {
		setState({
			region: {
				latitude: loc.lat,
				longitude: loc.lng,
				latitudeDelta: 0.003,
				longitudeDelta: 0.003
			}
		});
	};

	const onMapRegionChange = (region) => {
		setState({ region });
	};

	const saveAndGoBack = () => {
		console.log(address);
		const token = SecureStore.getItemAsync('secure_token');
		if (token) {
			navigation.navigate({
				name: 'UpdateUsuarioScreen',
				params: { ubicacion: address },
				merge: true,
			});
		} else {
			navigation.navigate({
				name: 'RegisterScreen',
				params: { ubicacion: address },
				merge: true,
			});
		}
	};

	return (
		<View style={styles.container}>
			<View style={{ flex: 1 }}>
				<MapInput notifyChange={
					(loc, address) => {
						getCoordsFromName(loc);
						setAddress(address);
					}
				}
				/>
			</View>
			{
				state.region['latitude'] ?
					<View style={{ flex: 2 }} >
						<MyMapView
							region={state.region}
							onRegionChange={(reg) => onMapRegionChange(reg)} />
						<Button title="Confirmar" onPress={() => saveAndGoBack()} />
					</View> : null
			}
		</View >
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
});

LocationScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	route: PropTypes.func,
};

MyMapView.propTypes = {
	region: PropTypes.shape({
		latitude: PropTypes.number,
		longitude: PropTypes.number,
		latitudeDelta: PropTypes.number,
		longitudeDelta: PropTypes.number
	}),
	saveAndGoBack: PropTypes.func,
	onRegionChange: PropTypes.func,
};

MapInput.propTypes = {
	notifyChange: PropTypes.func
};

export default LocationScreen;
