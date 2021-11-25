import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
	NativeBaseProvider,
	Box,
	Heading,
  Pressable,
	Menu,
	Modal,
	FlatList,
	Divider,
	Text,
	VStack,
	HStack,
	Button,
	Spinner
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { historialDeCursos } from '../src/services/historialDeCursos';
import PropTypes from 'prop-types';

HistoricoDeCursosScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
};

function HistoricoDeCursosScreen({ navigation }) {
//function HistoricoDeCursosScreen() {
	const [loading, setLoading] = React.useState(true);
	const [cursos, setCursos] = React.useState([]);
	const [message, setMessage] = React.useState('');
	const [error, setError] = React.useState(false);
	const [showModalError, setShowModalError] = React.useState(false);
	const isFocused = useIsFocused();
  const [porDefecto, setPorDefecto] = React.useState('Todos');

	const renderItem = ({ item }) => (
		<>
			<Text bold fontSize="md">
				{item.nombre}
			</Text>
			<Divider my="1" />
		</>
	);

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			historialDeCursos()
				.then((response) => response.json())
				.then((json) => {
					console.log(json);
					if (json.status === 503){
						setMessage('courses service is currently unavailable, please try later');
						setError(true);
						setShowModalError(true);
					} else {
						setCursos(json.message);
					}
					setLoading(false);
				});
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [isFocused])
	);

	return (

		<NativeBaseProvider>
			{
				loading ?
					<View style={spinnerStyles.spinnerStyle}>
						<Spinner color="indigo.500" size="lg" />
					</View> :
					<>
						<Modal isOpen={showModalError} onClose={() => setShowModalError(false)} size="lg">
							<Modal.Content maxWidth="350">
								<Modal.Body>
									<VStack space={3}>
										<HStack alignItems="center" justifyContent="space-between">
											<Text fontWeight="medium">{message}</Text>
										</HStack>
									</VStack>
								</Modal.Body>
								<Modal.Footer>
									<Button colorScheme="indigo"
										flex="1"
										onPress={() => {
											error ? setShowModalError(false) : navigation.goBack();
										}}
									>
                    Continuar
									</Button>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
            <Box style={{position: 'absolute', top: 20, right: 20}}>
              <Menu
                w="190"
                trigger={(triggerProps) => {
                  return (
                    <Pressable accessibilityLabel="More options menu" {...triggerProps} >
                      <Icon name="more-vert" size={35} />
                    </Pressable>
                  );
                }}
              >
                <Menu.OptionGroup defaultValue={porDefecto} title="Cursos" type="radio">
                  <Menu.ItemOption onPress={() => {setPorDefecto('Todos')}} value="Todos">Todos</Menu.ItemOption>
                  <Menu.ItemOption onPress={() => {setPorDefecto('En curso')}} value="En curso">En curso</Menu.ItemOption>
                  <Menu.ItemOption onPress={() => {setPorDefecto('Finalizados')}} value="Finalizados">Finalizados</Menu.ItemOption>
                </Menu.OptionGroup>
              </Menu>
            </Box>
						<Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center', top: 20 }}>
							<Heading size="lg" color="coolGray.800" fontWeight="600">
							Histórico de cursos{'\n'}
							</Heading>
							<FlatList
								data={cursos}
								renderItem={renderItem}
								keyExtractor={item => String(item.id)}
							/>
						</Box>
					</>
			}
		</NativeBaseProvider>
	);
}

const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default HistoricoDeCursosScreen;
