import firebase from 'firebase';
import Constants from 'expo-constants';

firebase.initializeApp(Constants.manifest.extra.firebase);

export default firebase;