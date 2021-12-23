import Constants from 'expo-constants';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';

firebase.initializeApp(Constants.manifest.extra.firebase);
firebase.firestore().settings({ experimentalForceLongPolling: true, merge: true });

export const database = getFirestore();
export default firebase;