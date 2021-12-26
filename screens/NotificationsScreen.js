import React, { useState } from 'react';
import {
	NativeBaseProvider,
	Box,
	Text,
	Pressable,
	Heading,
	Icon,
	HStack,
	VStack,
	Spacer,
	FlatList,
	Spinner
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerUsuario } from '../src/services/obtenerUsuario';
import { View, StyleSheet } from 'react-native';

export default function NotificationsScreen() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = React.useState([]);
	function getNotifications(userId) {
		const db = getDatabase();
		const reference = ref(db, 'notifications/' + userId);
		console.log('reference', reference);
		onValue(reference, (snapshot) => {
			const notification = snapshot.val();
			console.log('notification', notification);
			if (notification) {
				const b = notification; //cosito es lo que contiene el data que me pasaste
				let data = [];
				Object.entries(b).forEach(v => data.push(v[1].notification));
				console.log(data);
				setData(data);
				setLoading(false);
			} else {
				setLoading(false);
			}
		});
	}

	useFocusEffect(
		React.useCallback(() => {
			obtenerUsuario()
				.then(data => data.json())
				.then(json => {
					console.log(json);
					getNotifications(json.user_id);
				});
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions

			};
		}, [])
	);

	return (
		<NativeBaseProvider>
			<Box
				w={{
					base: '100%',
					md: '25%',
				}}
				bg="white"
			>
				<Heading p="4" pb="3" size="lg">
					Notificaciones
				</Heading>
				{
					loading ? <View style={spinnerStyles.spinnerStyle}>
						<Spinner color="indigo.500" size="lg" />
					</View> :
						<Basic data={data} />
				}
			</Box>
		</NativeBaseProvider>
	);
}

function Basic(data) {
	const [listData, setListData] = useState(data.data);
	useFocusEffect(
		React.useCallback(() => {
			console.log('en basic', data.data);
			const test = data.data;
			console.log('test', data.data);
			console.log('list data', listData, test);
			setListData(test);
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions

			};
		}, [listData, data])
	);

	const renderItem = ({ item }) => (
		<Box borderBottomWidth="1" borderColor="coolGray.200"
			pl="4"
			pr="5"
			py="2">
			<HStack alignItems="center" space={3} p="2">
				<Icon as={<MaterialIcons name="email" />} color="black" size="xs" />
				<VStack>
					<Text color="coolGray.800" _dark={{ color: 'warmGray.50' }} bold>
						{item.title}
					</Text>
					<Text color="coolGray.600" _dark={{ color: 'warmGray.200' }}> {item.content}</Text>
				</VStack>
				<Spacer />
			</HStack>
		</Box>
	);

	return (

		<FlatList
			data={listData}
			renderItem={renderItem}
			ListHeaderComponent={() => (listData.length === 0 ?
				<Box flex="1" bg="white"><Text>No tienes notificaciones</Text></Box>
				: null)
			}
		/>

	);
}

const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
