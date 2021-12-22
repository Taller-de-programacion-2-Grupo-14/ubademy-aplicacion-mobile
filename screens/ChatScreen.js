import React, {
	useState,
	useLayoutEffect,
	useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { GiftedChat } from 'react-native-gifted-chat';
import {
	collection,
	addDoc,
	orderBy,
	query,
	onSnapshot
} from 'firebase/firestore';
import * as SecureStore from 'expo-secure-store';
import { database } from '../src/utils/firebase';
import { useFocusEffect } from '@react-navigation/native';
import firebase from '../src/utils/firebase';
export default function ChatScreen({ navigation, route }) {
	const [messages, setMessages] = useState([]);
	const [email, setEmail] = useState('');
	const [chatForID, setChatForID] = useState('');
	const [roomName, setRoomName] = useState('');
	const [docId, setDocId] = useState('');

	useFocusEffect(
		React.useCallback(() => {
			const chatIDpre = [];
			console.log('route', route);
			SecureStore.getItemAsync('user_email').then((value) => {
				setEmail(value);
				chatIDpre.push(value);
				console.log('en chat screen', email);
				console.log('en chat screen2', value);
				console.log('antes de create group', chatIDpre);
				if (route.params?.id) {
					console.log(route.params.id);
					setChatForID(route.params.id);
					chatIDpre.push(route.params.id);
					console.log('en chat screen3', chatIDpre);
				}
				chatIDpre.sort();
				const roomName = chatIDpre.join('_');
				setRoomName(roomName);
				console.log('room name esta seteado?', roomName);
				//chequeo por room si existe, si no existe lo creo con el codigo que esta ahora
				firebase.firestore().collection('THREADS').where('name', '==', roomName).get().then(snapshot => {
					console.log('snapshot', snapshot);
					if (!snapshot.empty) {
						snapshot.forEach(doc => {
							console.log(doc.id, '=>', doc.data());
							setDocId(doc.id);
						});
						console.log('matching documents.');
						return;
					} else {
						firebase.firestore()
							.collection('THREADS')
							.add({
								name: roomName,
								latestMessage: {
									text: `You have joined the room ${roomName}.`,
									createdAt: new Date().getTime()
								}
							})
							.then(docRef => {
								const pepito = docRef.id;
								docRef.collection('MESSAGES').add({
									text: `You have joined the room ${roomName}.`,
									createdAt: new Date().getTime(),
									system: true
								});
								setDocId(pepito);
								console.log('el id recien creado', docId);
							});
					}
				});
			});
			console.log(docId, roomName, email);
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);
	useLayoutEffect(() => {
		console.log('en el use layout effect', docId);
		if (docId) {
			const messagesListener = firebase.firestore()
				.collection('THREADS')
				.doc(docId)
				.collection('MESSAGES')
				.orderBy('createdAt', 'desc')
				.onSnapshot(querySnapshot => {
					const messages = querySnapshot.docs.map(doc => {
						const firebaseData = doc.data();

						const data = {
							_id: doc.id,
							text: '',
							createdAt: new Date().getTime(),
							...firebaseData
						};

						if (!firebaseData.system) {
							data.user = {
								...firebaseData.user,
								name: firebaseData.user.email
							};
						}

						return data;
					});

					setMessages(messages);
				});

			return () => messagesListener();
		}
		// const collectionRef = collection(database, 'chats');
		// const q = query(collectionRef, orderBy('createdAt', 'desc'));

		// const unsubscribe = onSnapshot(q, querySnapshot => {
		// 	setMessages(
		// 		querySnapshot.docs.map(doc => ({
		// 			_id: doc.data()._id,
		// 			createdAt: doc.data().createdAt.toDate(),
		// 			text: doc.data().text,
		// 			user: doc.data().user
		// 		}))
		// 	);
		// });

		// return unsubscribe;
	});

	async function handleSend(messages) {
		const text = messages[0].text;

		firebase.firestore()
			.collection('THREADS')
			.doc(docId)
			.collection('MESSAGES')
			.add({
				text,
				createdAt: new Date().getTime(),
				user: {
					_id: email,
					email: email
				}
			});

		await firebase.firestore()
			.collection('THREADS')
			.doc(docId)
			.set(
				{
					latestMessage: {
						text,
						createdAt: new Date().getTime()
					}
				},
				{ merge: true }
			);
	}

	const onSend = useCallback((messages = []) => {
		setMessages(previousMessages =>
			GiftedChat.append(previousMessages, messages)
		);
		const { _id, createdAt, text, user } = messages[0];
		console.log('en onSend2', user);
		addDoc(collection(database, 'chats'), {
			_id,
			createdAt,
			text,
			user
		});
	}, []);

	return (
		<GiftedChat
			messages={messages}
			onSend={handleSend}
			user={{
				_id: email,
			}}
		/>
	);
}

ChatScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
		goBack: PropTypes.func,
	}).isRequired,
	route: PropTypes.object
};




