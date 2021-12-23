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
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from '@react-navigation/native';

async function schedulePushNotification() {
	await Notifications.scheduleNotificationAsync({
		content: {
			title: 'Has recibido una invitación',
			body: 'Te han invitado a ser colaborador de un curso, deseas colaborar?',
			data: { data: 'goes here' },
			categoryIdentifier: 'collaborations',
		},
		trigger: { seconds: 2 },
	});
}

export default function MessagesScreen() {

	useFocusEffect(
		React.useCallback(() => {
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
					Inbox
				</Heading>
				<Button
					title="Press to schedule a notification"
					onPress={async () => {
						await schedulePushNotification();
					}}
				/>
				<Basic />
			</Box>
		</NativeBaseProvider>
	);
}

function Basic() {
	const data = [
		{
			id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
			fullName: 'Afreen Khan',
			timeStamp: '12:47 PM',
			recentText: 'Good Day!',
			avatarUrl:
				'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		},
		{
			id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
			fullName: 'Sujita Mathur',
			timeStamp: '11:11 PM',
			recentText: 'Cheer up, there!',
			avatarUrl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
		},
		{
			id: '58694a0f-3da1-471f-bd96-145571e29d72',
			fullName: 'Anci Barroco',
			timeStamp: '6:22 PM',
			recentText: 'Good Day!',
			avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
		},
		{
			id: '68694a0f-3da1-431f-bd56-142371e29d72',
			fullName: 'Aniket Kumar',
			timeStamp: '8:56 PM',
			recentText: 'All the best',
			avatarUrl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
		},
		{
			id: '28694a0f-3da1-471f-bd96-142456e29d72',
			fullName: 'Kiara',
			timeStamp: '12:47 PM',
			recentText: 'I will call today.',
			avatarUrl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
		},
	];

	const [listData, setListData] = useState(data);

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
						<Avatar size="48px" source={{ uri: item.avatarUrl }} />
						<VStack>
							<Text color="coolGray.800" _dark={{ color: 'warmGray.50' }} bold>
								{item.fullName}
							</Text>
							<Text color="coolGray.600" _dark={{ color: 'warmGray.200' }}>{item.recentText}</Text>
						</VStack>
						<Spacer />
						<Text fontSize="xs" color="coolGray.800" _dark={{ color: 'warmGray.50' }} alignSelf="flex-start">
							{item.timeStamp}
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
				rightOpenValue={-130}
				previewRowKey={'0'}
				previewOpenValue={-40}
				previewOpenDelay={3000}
				onRowDidOpen={onRowDidOpen}
			/>
		</Box>
	);
}