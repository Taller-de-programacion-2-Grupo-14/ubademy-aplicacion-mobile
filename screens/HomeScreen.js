import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	NativeBaseProvider,
	Box,
	Center,
	Heading,
	Spinner,
	useTheme,
	VStack,
	HStack,
	IconButton,
	Icon,
	Text,
	StatusBar,
	AspectRatio,
	Image,
	Stack,
	Badge
} from 'native-base';

import {
	Avatar,
	Button,
	Card,
	Title,
	Paragraph,
	List,
	Headline,
} from 'react-native-paper';

import { obtenerUsuario } from '../src/services/obtenerUsuario';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


export default function HomeScreen() {
	const [firstName, setFirstName] = React.useState('');
	const [lastName, setLastName] = React.useState('');
	const [subscripcion, setSubscripcion] = React.useState('');
	const [loading, setLoading] = React.useState(true);
	const { colors } = useTheme();

	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			obtenerUsuario()
				.then(data => data.json())
				.then(json => {
					console.log(json);
					setFirstName(json.first_name);
					setLastName(json.last_name);
					setSubscripcion(json.subscription);
					setLoading(false);
				});
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);

	return (

		<NativeBaseProvider>
			{
				loading ?
					<View style={spinnerStyles.spinnerStyle}>
						<Spinner color="indigo.500" size="lg" />
					</View> :

					<View>
						<StatusBar backgroundColor="#3700B3" barStyle="light-content" />
						<HStack bg='#fff' px="1" py="3" justifyContent='space-between' alignItems='center'>
							<HStack space="4" alignItems='center'>
								<IconButton icon={<Icon size="sm" as={<MaterialIcons name='menu' />} color="white" />} />
								<Text color="black" fontSize="20" >UBADEMY</Text>
							</HStack>
							<HStack space="2">
								<IconButton icon={<Icon as={<MaterialIcons name='favorite' />} size='sm' color="white" />} />
								<IconButton icon={<Icon as={<MaterialIcons name='search' />}
									color="white" size='sm' />} />
								<IconButton icon={<Icon as={<MaterialIcons name='more-vert' />} size='sm' color="white" />} />
							</HStack>
						</HStack>
						<Headline style={{ marginLeft: 23 }}>Cursos recientes</Headline>
						<Card
							style={{
								shadowOffset: { width: 5, height: 5 },
								width: '90%',
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
					</View>}
		</NativeBaseProvider >
	);
}

const spinnerStyles = StyleSheet.create({
	spinnerStyle: {
		flex: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff"
	},
	header: {
		backgroundColor: "#c0392b",
		height: 56,
		paddingTop: 10
	},
	headerText: {
		color: "#fff",
		fontSize: 18,
	},
});
