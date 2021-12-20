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
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerUsuario } from '../src/services/obtenerUsuario';

export default function NotificationsScreen() {

	const [data, setData] = React.useState([]);

	function getNotifications(userId) {
		const db = getDatabase();
		const reference = ref(db, 'notifications/' + userId);
		console.log('reference', reference);
		onValue(reference, (snapshot) => {
			const notification = snapshot.val();
			console.log('notification', notification);
			const b = notification; //cosito es lo que contiene el data que me pasaste
			let data = [];
			Object.entries(b).forEach(v => data.push(v[1].notification));
			console.log(data);
			setData(data);
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
			<Box bg="white" flex="1" safeAreaTop>
				<Heading p="4" pb="3" size="lg">
					Notificaciones
				</Heading>
				<Basic data={data} />
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

	const closeRow = (rowMap, rowKey) => {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	};

	const deleteRow = (rowMap, rowKey) => {
		closeRow(rowMap, rowKey);
		const newData = [...listData];
		const prevIndex = listData.findIndex((item) => item.key === rowKey);
		newData.splice(prevIndex, 1);
		setListData(newData);
	};

	const onRowDidOpen = (rowKey) => {
		console.log('This row opened', rowKey);
	};

	const renderItem = ({ item }) => (
		<Box>
			<Pressable onPress={() => console.log('You touched me')} bg="white">
				<Box
					pl="4"
					pr="5"
					py="2"
				>
					<HStack alignItems="center" space={3}>
						<Icon as={<MaterialIcons name="email" />} color="black" size="xs" />
						<VStack>
							<Text color="coolGray.800" _dark={{ color: 'warmGray.50' }} bold>
								{item.title}
							</Text>
							<Text color="coolGray.600" _dark={{ color: 'warmGray.200' }}> {item.content}</Text>
						</VStack>
						<Spacer />
						<Text fontSize="xs" color="coolGray.800" _dark={{ color: 'warmGray.50' }} alignSelf="flex-start">
							{item.date}
						</Text>
					</HStack>
				</Box>
			</Pressable>
		</Box>
	);

	const renderHiddenItem = (data, rowMap) => (
		<HStack flex="1" pl="2">
			<Pressable
				w="70"
				ml="auto"
				bg="coolGray.200"
				justifyContent="center"
				onPress={() => closeRow(rowMap, data.item.key)}
				_pressed={{
					opacity: 0.5,
				}}>
				<VStack alignItems="center" space={2}>
					<Icon
						as={<Entypo name="dots-three-horizontal" />}
						size="xs"
						color="coolGray.800"
					/>
					<Text fontSize="xs" fontWeight="medium" color="coolGray.800">
						More
					</Text>
				</VStack>
			</Pressable>
			<Pressable
				w="70"
				bg="red.500"
				justifyContent="center"
				onPress={() => deleteRow(rowMap, data.item.key)}
				_pressed={{
					opacity: 0.5,
				}}>
				<VStack alignItems="center" space={2}>
					<Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
					<Text color="white" fontSize="xs" fontWeight="medium">
						Delete
					</Text>
				</VStack>
			</Pressable>
		</HStack>
	);

	return (
		<Box bg="white" safeArea flex="1">
			<SwipeListView
				data={listData}
				renderItem={renderItem}
				renderHiddenItem={renderHiddenItem}
				leftOpenValue={-130}
				previewRowKey={'0'}
				previewOpenValue={-40}
				previewOpenDelay={3000}
				onRowDidOpen={onRowDidOpen}
			/>
		</Box>
	);
}

