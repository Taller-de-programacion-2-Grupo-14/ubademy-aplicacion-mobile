import React, { useState, useEffect, useRef } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import UserScreen from './UserScreen';
import CursosScreen from './CursosScreen';
import NotificationScreen from './NotificationScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeBaseProvider } from 'native-base';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { setUserExpoToken } from '../src/services/setExpoToken';
import { aceptarColaboracion } from '../src/services/aceptarColaboracion';
import { getDatabase, ref, push } from 'firebase/database';
import { obtenerUsuario } from '../src/services/obtenerUsuario';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SubscriptionUpgrade from './SubscriptionUpgrade';
import HomeScreen from './HomeScreen';

function saveNotification(notificationInfo, userId) {
	console.log('en save notification');
	const db = getDatabase();
	const reference = ref(db, 'notifications/' + userId);
	push(reference, {
		notification: notificationInfo,
	});
}

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

Notifications.setNotificationCategoryAsync('collaborations', [
	{
		identifier: 'accept',
		buttonTitle: 'Aceptar',
		isDestructive: true,
		isAuthenticationRequired: true,
	},
	{
		identifier: 'deny',
		buttonTitle: 'Cancelar',
		isDestructive: true,
		isAuthenticationRequired: true,
	},
]);

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

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeScreenStack() {
	return (
		<Stack.Navigator initialRouteName="Home3">
			<Stack.Screen name="Home3" component={HomeScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Subscripcion" component={SubscriptionUpgrade} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}

export default function HomeApp() {
	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();
	const [userId, setUserId] = useState('');

	useEffect(() => {
		registerForPushNotificationsAsync().then(token => {
			setExpoPushToken(token);
			console.log('a ver si token es undefined', token);
			if (token) {
				console.log('no es undefined', token);
				setUserExpoToken(token)
					.then((response) => response.json())
					.then((json) => {
						console.log(json);
						if (json.status === 200) {
							console.log('expo push token set correctly');
						} else {
							if (json.status === 403) {
								console.log('token invalido');
							} else {
								console.log('Ops, something went wrong');
							}
						}
					})
					.catch((error) => {
						console.error(error);
					});
			}
		}).catch((error) => {
			console.error(error);
		});
		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			setNotification(notification);
			console.log(notification);
			const notificationInfo = {
				'date': notification.date,
				'title': notification.request.content.title,
				'content': notification.request.content.body,
				'id': notification.request.identifier
			};
			obtenerUsuario()
				.then(data => data.json())
				.then(json => {
					console.log(json);
					setUserId(json.user_id);
					console.log('en noti listener id usuario', userId);
					saveNotification(notificationInfo, json.user_id);
					console.log(notificationInfo);
					console.log('lalalal222');
				});
		});

		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
			console.log(response);
			console.log(response.notification.request.content.data);
			if (response.actionIdentifier === 'accept') {
				console.log('le dio accept');
				aceptarColaboracion(response.notification.request.content.data.id_course).then((response) => response.json())
					.then((json) => {
						console.log(json);
						if (json.status === 200) {
							console.log('colaborador agregado exitosamente');
						} else {
							console.log('error al agregar colaborador');
						}
					})
					.catch((error) => {
						console.error(error);
					});
			}

			//si es collabaration entonces chequeo el action identifier y si es aceptar , buscar el id de curso
			// y llamar al endpoint
			//si dio cancelar, que se cierre la notificacion y ya
			// /courses/collaborators
			//"data": Object {
			//	"id_course": 1,
			//  },
			console.log('lalalal');
		});

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	return (
		<NativeBaseProvider>
			<Tab.Navigator activeColor="white" inactiveColor="white" shifting={true} barStyle={{ backgroundColor: '#736bfc' }}>
				<Tab.Screen
					name="Home2"
					component={HomeScreenStack}
					options={{
						tabBarLabel: 'Home2',
						tabBarIcon: ({ focused }) => (
							<MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} color='white' size={26} />
						),
					}}
				/>
				<Tab.Screen
					name="Perfil"
					component={UserScreen}
					options={{
						tabBarLabel: 'Perfil',
						tabBarIcon: ({ focused }) => (
							<MaterialCommunityIcons name={focused ? 'account' : 'account-outline'} color='white' size={26} />
						),
					}}
				/>
				<Tab.Screen
					name="Cursos"
					component={CursosScreen}
					options={{
						tabBarLabel: 'Cursos',
						tabBarIcon: ({ focused }) => (
							<MaterialCommunityIcons name={focused ? 'book-open-page-variant' : 'book-open-variant'} color='white' size={26} />
						),
					}}
				/>
				<Tab.Screen
					name="Notificaciones"
					component={NotificationScreen}
					options={{
						tabBarLabel: 'Notificaciones',
						tabBarIcon: ({ focused }) => (
							<MaterialCommunityIcons name={focused ? 'email-open-outline' : 'email-outline'} color='white' size={26} />
						),
					}}
				/>
			</Tab.Navigator>
		</NativeBaseProvider>
	);
}
