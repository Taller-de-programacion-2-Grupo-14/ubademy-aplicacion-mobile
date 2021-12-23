import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Heading,
	Spinner,
	Button,
	VStack,
	HStack,
	IconButton,
	Icon,
	Text,
	Center,
	Link,
	StatusBar,
	FlatList,
	ScrollView
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { obtenerUsuario } from '../src/services/obtenerUsuario';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useIsFocused } from '@react-navigation/native';
import {
	Avatar,
	Card,
	Title,
	Paragraph,
	List,
	Headline,
} from 'react-native-paper';

export default function HomeScreen({ navigation }) {
	const [firstName, setFirstName] = React.useState('');
	const [loading, setLoading] = React.useState(true);
	const [subscripcion, setSubscripcion] = React.useState('');
	const isFocused = useIsFocused();


	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			console.log('en home screen');
			obtenerUsuario()
				.then(data => data.json())
				.then(json => {
					console.log(json);
					setFirstName(json.first_name);
					if (json.subscription === 'free') {
						console.log('es free entonces le pongo basico');
						setSubscripcion('BASICA');
					}
					if (json.subscription === 'platinum') {
						console.log('es platinum entonces le pongo estandard');
						setSubscripcion('STANDARD');
					}
					if (json.subscription === 'black') {
						console.log('es black entonces le pongo premium');
						setSubscripcion('PREMIUM');
					}
					SecureStore.setItemAsync('user_email', json.email);
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
					<Box bg="#fff" p="2">
						<StatusBar backgroundColor="#000" barStyle="light-content" />

						<Box safeAreaTop backgroundColor="indigo.500" />

						<HStack bg="indigo.500" px="1" py="3" style={{ justifyContent: 'center' }} alignItems='center'>
							<Text color="white" p="2" fontSize="20" fontWeight='bold'>HOLA {firstName}</Text>
						</HStack>
						<Box
							mt="7"
							bg="warmGray.50"
							overflow="hidden"
							borderColor="coolGray.200"
							borderWidth="1"
							rounded="md"
							w="100%"
							h="100"
							_text={{
								color: 'gray',
							}}
							p="5"
						>
							<HStack >
								<Text fontSize="md">Tu nivel de subscripcion es </Text>
								<Text fontSize="md" bold >{subscripcion}</Text>
							</HStack>
							<Link onPress={() => navigation.navigate('Subscripcion')}
								_text={{ fontSize: 'xs', fontWeight: '500', color: 'indigo.500' }}
								alignSelf="flex-start"
								mt="1">
								Quiero cambiar mi subscripcion
							</Link>
						</Box>
						<Heading p="3" size="lg">Nuevos cursos </Heading>
						<Card
							style={{
								shadowOffset: { width: 5, height: 5 },
								width: '100%',
								borderRadius: 12,
								alignSelf: 'center',
								marginBottom: 10,
							}}>
							<Card.Content>
								<Title>Blog post</Title>
								<Card.Cover
									style={{
										width: '100%',
										height: 190,
										alignSelf: 'center',
									}}
									source={{
										uri:
											'https://images.unsplash.com/photo-1573921470445-8d99c48c879f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
									}}
								/>
								<Paragraph>just a blog post</Paragraph>
							</Card.Content>
						</Card>
						<Card
							style={{
								shadowOffset: { width: 5, height: 5 },
								width: '100%',
								borderRadius: 12,
								alignSelf: 'center',
								marginBottom: 10,
							}}>
							<Card.Content>
								<Title>Blog post</Title>
								<Card.Cover
									style={{
										width: '100%',
										height: 190,
										alignSelf: 'center',
									}}
									source={{
										uri:
											'https://images.unsplash.com/photo-1573921470445-8d99c48c879f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
									}}
								/>
								<Paragraph>just a blog post</Paragraph>
							</Card.Content>
						</Card>
						<Card
							style={{
								shadowOffset: { width: 5, height: 5 },
								width: '100%',
								borderRadius: 12,
								alignSelf: 'center',
								marginBottom: 10,
							}}>
							<Card.Content>
								<Title>Blog post</Title>
								<Card.Cover
									style={{
										width: '100%',
										height: 190,
										alignSelf: 'center',
									}}
									source={{
										uri:
											'https://images.unsplash.com/photo-1573921470445-8d99c48c879f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
									}}
								/>
								<Paragraph>just a blog post</Paragraph>
							</Card.Content>
						</Card>
					</Box>
			}
		</NativeBaseProvider >
	);
}

HomeScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
};


const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
