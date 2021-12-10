import firebase from './firebase';
import Constants from 'expo-constants';
import * as Facebook from 'expo-facebook';

export async function signInWithFacebook() {
	const appId = Constants.manifest.extra.facebook.appId;
	const appName = Constants.manifest.extra.facebook.appId;
	try {
		await Facebook.initializeAsync({ appId, appName }); // enter your Facebook App Id 
		const { type, token } = await Facebook.logInWithReadPermissionsAsync({
			permissions: ['public_profile', 'email'],
		});
		if (type === 'success') {
			// SENDING THE TOKEN TO FIREBASE TO HANDLE AUTH
			const credential = firebase.auth.FacebookAuthProvider.credential(token);
			return firebase.auth().signInWithCredential(credential);
			// .then(user => { // All the details about user are in here returned from firebase
			// 	console.log('Logged in successfully', user);
			// 	return user;
			// })
			// .catch((error) => {
			// 	console.log('Error occurred ', error);
			// });
		} else {
			// type === 'cancel'
			console.log('Error al autenticar con facebook');
		}
	} catch ({ message }) {
		alert(`Facebook Login Error: ${message}`);
	}
}
