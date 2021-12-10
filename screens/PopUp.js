import { Alert } from 'react-native';
import { eliminarUsuario } from '../src/services/eliminarUsuario';

const showAlert = (method, navigation) =>
	Alert.alert(
		'',
		'Estas seguro que queres borrar tu perfil?',
		[
			{
				text: 'Cancelar',
				style: 'cancel',
				onPress: () => navigation.goBack()
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



export default showAlert;