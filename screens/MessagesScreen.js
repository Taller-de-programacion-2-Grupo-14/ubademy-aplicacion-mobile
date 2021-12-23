import React, { useState } from 'react';
import {
	NativeBaseProvider,
	Box,
	Text,
	Pressable,
	Heading,
	Icon,
	HStack,
	Avatar,
	VStack,
	Spacer,
	Button
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import firebase from '../src/utils/firebase';
import * as SecureStore from 'expo-secure-store';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import PropTypes from 'prop-types';

export default function MessagesScreen({ navigation }) {
	const [loading, setLoading] = useState(true);
	const [threads, setThreads] = useState([]);
	const [email, setEmail] = useState([]);

	useFocusEffect(
		React.useCallback(() => {
			SecureStore.getItemAsync('user_email').then((email) => {
				setEmail(email);
				let threadList1 = [];
				let threadList2 = [];
				firebase.firestore().collection('THREADS').where('user1', '==', email).orderBy('latestMessage.createdAt', 'desc').get().then(snapshot => {
					if (!snapshot.empty) {
						const threads1 = snapshot.docs.map(documentSnapshot => {
							return {
								_id: documentSnapshot.id,
								// give defaults
								name: '',

								latestMessage: {
									text: ''
								},
								...documentSnapshot.data()
							};
						});
						console.log('snapshot', threads1);
						threadList1 = threadList1.concat(threads1);
						console.log('threadList', threadList1);
						console.log('matching documents.');
					}
				});
				firebase.firestore().collection('THREADS').where('user2', '==', email).orderBy('latestMessage.createdAt', 'desc').get().then(snapshot => {
					if (!snapshot.empty) {
						const threads2 = snapshot.docs.map(documentSnapshot => {
							return {
								_id: documentSnapshot.id,
								// give defaults
								name: '',

								latestMessage: {
									text: ''
								},
								...documentSnapshot.data()
							};
						});
						threadList2 = threadList2.concat(threads2);
						console.log('snapshot2', threads2);
						console.log('threadList', threadList2);
						console.log('matching documents.');
						setThreads(threadList2);
						return;
					} else {
						console.log('no hay chats');
					}
				});
				if (loading) {
					setLoading(false);
				}
				setThreads(threadList1.concat(threadList2));
				console.log('thread1', threadList1);
				console.log('threads2', threadList2);
				console.log('threads', threads);
			});

			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions

			};
		}, [])
	);
	this.goToChat = (item) => {
		if (item.user1 === email) {
			navigation.navigate('Chat', { email: item.user2 });
		} else {
			navigation.navigate('Chat', { email: item.user1 });
		}
	};

	return (
		<NativeBaseProvider>
			<Box bg="white" flex="1" safeAreaTop>
				<Heading p="4" pb="3" size="lg">
					Inbox
				</Heading>
				<View style={styles.container}>
					<FlatList
						data={threads}
						keyExtractor={item => item._id}
						ItemSeparatorComponent={() => <Divider />}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => this.goToChat(item)}
							>
								<List.Item
									title={item.name}
									description={item.latestMessage.text}
									titleNumberOfLines={1}
									titleStyle={styles.listTitle}
									descriptionStyle={styles.listDescription}
									descriptionNumberOfLines={1}
								/>
							</TouchableOpacity>
						)}
					/>
				</View>

			</Box>
		</NativeBaseProvider>
	);
}

MessagesScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
	route: PropTypes.object
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f5f5f5',
		flex: 1
	},
	listTitle: {
		fontSize: 22
	},
	listDescription: {
		fontSize: 16
	}
});