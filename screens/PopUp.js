import React from 'react';
import {Alert} from 'react-native';
import * as SecureStore from 'expo-secure-store';

const showAlert = (method) =>
	Alert.alert(
		'',
		'Estas seguro que queres borrar tu perfil?',
		[
			{
				text: 'Cancelar',
				style: 'cancel'
			},
			{
				text: 'Borrar',
				onPress: () => eliminarUsuario().then(() => {
					console.log('usuario eliminado');
					method();
				}),
				style: 'destructive'
			},
		],
		{
			cancelable: true,
		}
	);

async function eliminarUsuario() {
	const token = await SecureStore.getItemAsync('secure_token');
	return fetch('https://ubademy-14.herokuapp.com/users/delete-user', {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'x-access-token': token
		}
	});
}

export default showAlert;