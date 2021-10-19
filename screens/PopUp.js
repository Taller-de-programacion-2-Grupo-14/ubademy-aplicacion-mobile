import { Alert } from 'react-native';
import { eliminarUsuario } from '../src/services/eliminarUsuario';
import PropTypes from 'prop-types';

showAlert.propTypes = {
	navigation: PropTypes.shape({
		goBack: PropTypes.func.isRequired,
	}).isRequired,
};

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