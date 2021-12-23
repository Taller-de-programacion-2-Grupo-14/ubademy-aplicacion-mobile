import React, {
	useState,
	useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
	GiftedChat,
	Bubble,
	Send,
	SystemMessage
} from 'react-native-gifted-chat';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';
import firebase from '../src/utils/firebase';
import { sendPushNotification } from '../src/services/notifications';
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
				if (route.params?.email) {
					console.log(route.params.email);
					setChatForID(route.params.email);
					chatIDpre.push(route.params.email);
					console.log('en chat screen3', chatIDpre);
				}
				chatIDpre.sort();
				const roomName = chatIDpre.join('_');
				setRoomName(roomName);
				console.log('room name esta seteado?', roomName);
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
									text: `Has iniciado un chat con ${route.params.email}.`,
									createdAt: new Date().getTime()
								},
								user1: value,
								user2: route.params.email
							})
							.then(docRef => {
								const pepito = docRef.id;
								docRef.collection('MESSAGES').add({
									text: `Has iniciado un chat con ${route.params.email}.`,
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
		sendPushNotification('Nuevo mensaje', `${route.params.email} te ha enviado un nuevo mensaje`, route.params.id, 'chat');
	}
	function renderBubble(props) {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#a44eff',
					},
					left: {
						backgroundColor: '#fff',
					}
				}}
				textStyle={{
					right: {
						color: '#fff'
					},
					left: {
						color: 'black'
					}
				}}
			/>
		);
	}

	function renderLoading() {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size='large' color='#a44eff' />
			</View>
		);
	}

	function renderSend(props) {
		return (
			<Send {...props}>
				<View style={styles.sendingContainer}>
					<IconButton icon='send-circle' size={32} color='#a44eff' />
				</View>
			</Send>
		);
	}

	function scrollToBottomComponent() {
		return (
			<View style={styles.bottomComponentContainer}>
				<IconButton icon='chevron-double-down' size={36} color='#a44eff' />
			</View>
		);
	}

	function renderSystemMessage(props) {
		return (
			<SystemMessage
				{...props}
				wrapperStyle={styles.systemMessageWrapper}
				textStyle={styles.systemMessageText}
			/>
		);
	}
	return (
		<GiftedChat
			messages={messages}
			onSend={handleSend}
			user={{
				_id: email,
			}}
			placeholder='Escribe tu mensaje aqui...'
			alwaysShowSend
			showUserAvatar
			scrollToBottom
			renderBubble={renderBubble}
			renderLoading={renderLoading}
			renderSend={renderSend}
			scrollToBottomComponent={scrollToBottomComponent}
			renderSystemMessage={renderSystemMessage}
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

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	sendingContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	bottomComponentContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	systemMessageWrapper: {
		borderRadius: 4,
		padding: 5
	},
	systemMessageText: {
		fontSize: 14,
		fontWeight: 'bold'
	}
});



