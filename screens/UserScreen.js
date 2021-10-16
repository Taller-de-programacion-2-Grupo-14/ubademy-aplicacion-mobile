import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UpdateUsuarioScreen from './UpdateUsuarioScreen';
import {
    NativeBaseProvider,
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Button,
    ScrollView,
    Spinner,
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerUsuario } from '../src/services/obtenerUsuario';

function UsuarioHome({ navigation }) {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [intrests, setIntrests] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            obtenerUsuario()
                .then(data => data.json())
                .then(json => {
                    setLoading(false);
                    setFirstName(json.first_name);
                    setLastName(json.last_name);
                    setEmail(json.email);
                    setLocation(json.location);
                })
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
                    <ScrollView
                        _contentContainerStyle={{
                            px: "20px",
                            mb: "4",
                        }}
                    >
                        <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" style={{ justifyContent: 'center' }}>
                            <Heading size="lg" color="coolGray.800" fontWeight="600">
                                Mis datos
                            </Heading>

                            <VStack space={3} mt="5">
                                <FormControl>
                                    <FormControl.Label
                                        _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                                        Email
                                    </FormControl.Label>
                                    <Text fontSize="sm" > {email} </Text>
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label
                                        _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                                        Nombre
                                    </FormControl.Label>
                                    <Text fontSize="sm"> {firstName} </Text>
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label
                                        _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                                        Apellido
                                    </FormControl.Label>
                                    <Text fontSize="sm" > {lastName} </Text>
                                </FormControl>

                                <FormControl>
                                    <FormControl.Label
                                        _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                                        Ubicacion
                                    </FormControl.Label>
                                    <Text fontSize="sm" > {location} </Text>
                                </FormControl>

                                <FormControl>
                                    <FormControl.Label
                                        _text={{ color: 'muted.700', fontSize: 'xs', fontWeight: 500 }}>
                                        Tipo de curso de mayor interes
                                    </FormControl.Label>
                                    <Text fontSize="sm" > {intrests} </Text>
                                </FormControl>
                                <Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => navigation.goBack()} >
                                    Volver
                                </Button>
                            </VStack>
                        </Box>
                    </ScrollView>
            }
        </NativeBaseProvider >
    );
}

const Drawer = createDrawerNavigator();

export default function UsuarioApp() {
    return (
        <Drawer.Navigator initialRouteName="UsuarioHome">
            <Drawer.Screen name="Mi perfil" component={UsuarioHome} />
            <Drawer.Screen name="Modificar datos" component={UpdateUsuarioScreen} />
            {/*                 <Drawer.Screen name="SignOut" component={SignOut} />
                <Drawer.Screen name="ChangePassword" component={ChangePassword} />
                <Drawer.Screen name="Eliminar" component={Eliminar} /> */}
        </Drawer.Navigator>
    );
}

const spinnerStyles = StyleSheet.create({
    spinnerStyle: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
});