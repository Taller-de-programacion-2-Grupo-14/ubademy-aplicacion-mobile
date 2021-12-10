import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { obtenerUsuarios } from '../src/services/obtenerUsuario';
import { useFocusEffect } from '@react-navigation/native';
import {
    NativeBaseProvider,
    Box,
    Text,
    Pressable,
    Heading,
    IconButton,
    Icon,
    HStack,
    Avatar,
    VStack,
    Spacer,
    Spinner,
    Modal,
    Button
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import Moment from 'moment';

export default function Contactscreen() {
    const [mode, setMode] = useState('Basic');
    const isFocused = useIsFocused();
    const [loading, setLoading] = React.useState(true);
    const [users, setUsers] = React.useState({});
    const [showModal, setShowModal] = React.useState(false);
    Moment.locale('es');
    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            obtenerUsuarios(false)
                .then(data => data.json())
                .then(json => {
                    setLoading(false);
                    console.log(json.users);
                    setUsers(json.users);
                });
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
                setUsers([]);
            };
        }, [isFocused], setUsers)
    );

    return (
        <NativeBaseProvider>
            <Box bg="white" flex="1" safeAreaTop>
                <Heading p="4" pb="3" size="lg">
                    Usuarios de Ubademy
                </Heading>
                <Text pl="4" pb="2" color="coolGray.800" _dark={{ color: 'warmGray.50' }} >
                    Selecciona un usuario y enviale un mensaje personal
                </Text>
                {
                    loading ?
                        <View style={spinnerStyles.spinnerStyle}>
                            <Spinner color="indigo.500" size="lg" />
                        </View> :
                        <Basic listData={users} />
                }
            </Box>
        </NativeBaseProvider>
    );
}

function Basic({ listData }) {

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
        console.log('en close row');
    };

    const onRowDidOpen = (rowKey) => {
        console.log('This row opened', rowKey);
    };

    const renderItem = ({ item }) => (

        < Box >
            <Pressable onPress={() => console.log('You touched me')} bg="white">
                <Box
                    pl="4"
                    pr="5"
                    py="2"
                >
                    <HStack alignItems="center" space={3}>
                        {(item.photo_url == '' || item.photo_url == null || item.photo_url == 'undefined') ? (<Avatar bg="indigo.500" size="48px" >{item.first_name.charAt(0).toUpperCase()}</Avatar>) :
                            <Avatar size="48px" source={{ uri: item.photo_url }} />
                        }
                        <VStack>
                            <Text color="coolGray.800" _dark={{ color: 'warmGray.50' }} bold>
                                {item.first_name} {item.last_name}
                            </Text>
                        </VStack>
                        <Spacer />
                        <VStack>
                            <Text fontSize="xs" color="coolGray.800" _dark={{ color: 'warmGray.50' }} >
                                Se registro el
                            </Text>
                            <Text fontSize="xs" color="coolGray.800" _dark={{ color: 'warmGray.50' }} alignSelf="flex-start">
                                {Moment(item.created_at).format('d MMM YYYY')}
                            </Text>
                        </VStack>
                    </HStack>
                </Box>
            </Pressable>
        </Box >

    );

    const renderHiddenItem = (data, rowMap, setShowModal) => (
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
                        color="coolGray.800" onPress={() => setShowModal(false)}
                    />
                    <Text fontSize="xs" fontWeight="medium" color="coolGray.800" onPress={() => setShowModal(false)}>
                        Ver
                    </Text>

                </VStack>
            </Pressable>
            <Pressable
                w="70"
                bg="indigo.500"
                justifyContent="center"
                onPress={() => console.log("Quiere chatear")}
                _pressed={{
                    opacity: 0.5,
                }}>
                <VStack alignItems="center" space={2}>
                    <Text color="white" fontSize="xs" fontWeight="medium">
                        Enviar
                    </Text>
                    <Icon as={<MaterialIcons name="message" />} color="white" size="xs" />
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
                leftOpenValue={-130}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
                keyExtractor={(item, index) => index.toString()}
            />
        </Box>
    );
}

const spinnerStyles = StyleSheet.create({
    spinnerStyle: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

