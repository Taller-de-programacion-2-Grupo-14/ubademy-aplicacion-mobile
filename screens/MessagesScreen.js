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
	Button,
	Center,
	Spinner
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import firebase from '../src/utils/firebase';
import * as SecureStore from 'expo-secure-store';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import Moment from 'moment';
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

				}).then(() => {
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
							threadList2 = threadList1.concat(threads2);
							console.log('snapshot2', threads2);
							console.log('threadList', threadList2);
							console.log('matching documents.');
							setThreads(threadList2);
							return;
						} else {
							console.log('no hay chats');
						}
					});

					setLoading(false);

					setThreads(threadList1.concat(threadList2));
					console.log('thread1', threadList1);
					console.log('threads2', threadList2);
					console.log('threads', threads);
				});
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
			{
				loading ? <View style={spinnerStyles.spinnerStyle}>
					<Spinner color="indigo.500" size="lg" />
				</View> :
					<Box bg="white" flex="1">

						<Heading p="4" pb="3" size="lg">
							Inbox
						</Heading>

						<FlatList
							data={threads}
							keyExtractor={item => item._id}
							ListHeaderComponent={() => (threads.length === 0 ?
								<Box flex="1" bg="white"><Text>No tienes mensajes</Text></Box>
								: null)
							}
							renderItem={({ item }) => (

								<TouchableOpacity
									onPress={() => this.goToChat(item)}
								>
									<Box
										borderBottomWidth="1"
										borderColor="coolGray.200"
										pl="4"
										pr="5"
										py="2"
									>
										<HStack space={3} justifyContent="space-between">
											<Icon as={<MaterialIcons name="chat" />} color="gray" size="sm" />
											<VStack>
												<Text
													color="coolGray.800"
													bold
												>
													{item.user1 === email ? item.user2 : item.user1}
												</Text>
												<Text
													color="coolGray.600"
												>
													{item.latestMessage.text}
												</Text>
											</VStack>
											<Spacer />
											<Text
												fontSize="xs"
												_dark={{
													color: 'warmGray.50',
												}}
												color="coolGray.800"
												alignSelf="flex-start"
											>
												{Moment(item.latestMessage.createdAt).format('d MMM YYYY')}
											</Text>
										</HStack>
									</Box>
								</TouchableOpacity>
							)}
						/>
					</Box>
			}
		</NativeBaseProvider>
	);
}

MessagesScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
	route: PropTypes.object
};
const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
