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

function fetchGroupByUserID(uid) {
	const vm = this;
	return new Promise((resolve, reject) => {
		const groupRef = db.collection('group');
		groupRef
			.where('members', 'array-contains', uid)
			.onSnapshot((querySnapshot) => {
				const allGroups = [];
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					data.id = doc.id;
					if (data.recentMessage) allGroups.push(data);
				});
				vm.groups = allGroups;
			});
	});
}

function filterGroup(userArray) {
	const vm = this;
	vm.groups = [];
	return new Promise((resolve, reject) => {
		let groupRef = db.collection('group');
		userArray.forEach((userId) => {
			groupRef = groupRef.where('members', '==', userId);
		});
		groupRef
			.get()
			.then(function (querySnapshot) {
				const allGroups = [];
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					data.id = doc.id;
					allGroups.push(data);
				});
				if (allGroups.length > 0) {
					resolve(allGroups[0]);
				} else {
					resolve(null);
				}
			})
			.catch(function (error) {
				reject(error);
			});
	});
}

function fetchMessagesByGroupId(groupId) {
	const vm = this;
	db.collection('message')
		.doc(groupId.trim())
		.collection('messages')
		.orderBy('sentAt')
		.onSnapshot((querySnapshot) => {
			const allMessages = [];
			querySnapshot.forEach((doc) => {
				if (doc) allMessages.push(doc.data());
			});
			vm.messages = allMessages;
		});
}

function saveMessage(messageText, sentAt, currentGroupId) {
	if (messageText.trim()) {
		const message = {
			messageText,
			sentAt,
			sentBy: this.user.uid,
		};
		return new Promise((resolve, reject) => {
			db.collection('message')
				.doc(currentGroupId)
				.collection('messages')
				.add(message)
				.then(function (docRef) {
					resolve(message);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
}


export default function ChatScreen({ navigation, route }) {
	const [messages, setMessages] = useState([]);
	const [email, setEmail] = useState('');
	const [chatForID, setChatForID] = useState('');

	useFocusEffect(
		React.useCallback(() => {
			SecureStore.getItemAsync('user_email').then((value) => {
				setEmail(value);
				console.log('en chat screen', email);
				console.log('en chat screen2', value);
			});
			console.log('route', route);
			if (route.params?.id) {
				const { id } = route.id;
				console.log(id);
				setChatForID(id);
				console.log('en chat screen3');
				console.log(chatForID);
			}
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [email, chatForID])
	);
	useLayoutEffect(() => {

		const collectionRef = collection(database, 'chats');
		const q = query(collectionRef, orderBy('createdAt', 'desc'));

		const unsubscribe = onSnapshot(q, querySnapshot => {
			setMessages(
				querySnapshot.docs.map(doc => ({
					_id: doc.data()._id,
					createdAt: doc.data().createdAt.toDate(),
					text: doc.data().text,
					user: doc.data().user
				}))
			);
		});

		return unsubscribe;
	});


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
			onSend={messages => onSend(messages)}
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




