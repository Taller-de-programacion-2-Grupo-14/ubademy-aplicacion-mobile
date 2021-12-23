import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

Notifications.setNotificationCategoryAsync('collaborations', [
	{
		actionId: 'accept',
		buttonTitle: 'Aceptar',
		isDestructive: true,
		isAuthenticationRequired: false,
	},
	{
		actionId: 'deny',
		buttonTitle: 'Cancelar',
		isDestructive: false,
		isAuthenticationRequired: true,
	},
]);

export default function App() {
	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			setNotification(notification);
		});

		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
			console.log(response);
			//si es collabaration entonces chequeo el action identifier y si es aceptar , buscar el id de curso
			// y llamar al endpoint
			//si dio cancelar, que se cierre la notificacion y ya
			// /courses/collaborators
			//"data": Object {
			//	"id_course": 1,
			//  },
		});

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'space-around',
			}}>
			<Text>Your expo push token: {expoPushToken}</Text>
			<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<Text>Title: {notification && notification.request.content.title} </Text>
				<Text>Body: {notification && notification.request.content.body}</Text>
				<Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
			</View>
			<Button
				title="Press to schedule a notification"
				onPress={async () => {
					await schedulePushNotification();
				}}
			/>
		</View>
	);
}

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

async function registerForPushNotificationsAsync() {
	console.log('en register for push notific');
	let token;
	if (Constants.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	return token;
}