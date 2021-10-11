import React, { useEffect } from 'react';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  HStack,
  Center,
  Pressable,
  Menu,
  HamburgerIcon,
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { IconButton, StatusBar } from "native-base";



export function Example() {
    return (

        <Menu
            w="190"
            trigger={(triggerProps) => {
                return (
                    <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                        <HamburgerIcon color='white' />
                    </Pressable>
                )
            }}
        >
            <Menu.Item>Arial</Menu.Item>
            <Menu.Item>Nunito Sans</Menu.Item>
            <Menu.Item>Roboto</Menu.Item>
            <Menu.Item>Poppins</Menu.Item>
            <Menu.Item>SF Pro</Menu.Item>
            <Menu.Item>Helvetica</Menu.Item>
            <Menu.Item isDisabled>Sofia</Menu.Item>
            <Menu.Item>Cookie</Menu.Item>
        </Menu>

    )
}

export default function HomeScreen({ navigation }) {
    const [selected, setSelected] = React.useState(1);
    const [userName, setUserName] = React.useState("lalala");

    useEffect(() => {
        //  fetch('http://10.0.2.2:8080/users/login')
        //      .then(data => data.json())
        //      .then(json => setUserName(json.username))
    })

    return (

        <NativeBaseProvider>
            <StatusBar backgroundColor="white" barStyle="light-content" />

            <Box safeAreaTop backgroundColor="indigo.500" />

            <HStack bg='indigo.500' px="1" py="3" justifyContent='space-between' alignItems='center'>
                <HStack space="4" alignItems='center'>
                    <Example />
                    <Text color="white" fontSize="20" >Home</Text>
                </HStack>
                <HStack space="2">
                    <IconButton icon={<Icon as={<MaterialIcons name='favorite' />} size='sm' color="white" />} />
                    <IconButton icon={<Icon as={<MaterialIcons name='search' />}
                        color="white" size='sm' />} />
                    <IconButton icon={<Icon as={<MaterialIcons name='more-vert' />} size='sm' color="white" />} />
                </HStack>
            </HStack>
            <Box flex={1} bg="white" safeAreaTop>
                <Center flex={1}></Center>
                <Heading size="lg" fontWeight="600" color="coolGray.800">
                    {userName}
                </Heading>

                <Heading size="lg" fontWeight="600" color="coolGray.800">
                    Bienvenido, ya estas loggeado
                </Heading>
                <HStack bg="indigo.500" alignItems="center" safeAreaBottom shadow={6}>
                    <Pressable
                        cursor="pointer"
                        opacity={selected === 0 ? 1 : 0.5}
                        py="3"
                        flex={1}
                        onPress={() => setSelected(0)}>
                        <Center>
                            <Icon
                                mb="1"
                                as={
                                    <MaterialCommunityIcons
                                        name={selected === 0 ? 'home' : 'home-outline'}
                                    />
                                }
                                color="white"
                                size="sm"
                            />
                            <Text color="white" fontSize="12">
                                Home
                            </Text>
                        </Center>
                    </Pressable>
                    <Pressable
                        cursor="pointer"
                        opacity={selected === 1 ? 1 : 0.5}
                        py="2"
                        flex={1}
                        onPress={() => setSelected(1)}
                    >
                        <Center>
                            <Icon
                                mb="1"
                                as={<MaterialIcons name="search" />}
                                color="white"
                                size="sm"
                            />
                            <Text color="white" fontSize="12">
                                Buscar
                            </Text>
                        </Center>
                    </Pressable>
                    <Pressable
                        cursor="pointer"
                        opacity={selected === 2 ? 1 : 0.6}
                        py="2"
                        flex={1}
                        onPress={() => setSelected(2)}
                    >
                        <Center>
                            <Icon
                                mb={1}
                                as={
                                    <MaterialCommunityIcons
                                        name={selected === 2 ? 'book-open' : 'book-open-outline'}
                                    />
                                }
                                color="white"
                                size="sm"
                            />
                            <Text color="white" fontSize={12}>
                                Cursos
                            </Text>
                        </Center>
                    </Pressable>
                    <Pressable
                        cursor="pointer"
                        opacity={selected === 3 ? 1 : 0.5}
                        py="2"
                        flex={1}
                        onPress={() => setSelected(3)}
                    >
                        <Center>
                            <Icon
                                mb={1}
                                as={
                                    <MaterialCommunityIcons
                                        name={selected === 3 ? 'account' : 'account-outline'}
                                    />
                                }
                                color="white"
                                size="sm"
                                onPress={() => navigation.navigate('UpdateUsuarioScreen')}
                            />
                            <Text color="white" fontSize="12">
                                Perfil
                            </Text>
                        </Center>
                    </Pressable>
                </HStack>
            </Box>
        </NativeBaseProvider>
    );
}
