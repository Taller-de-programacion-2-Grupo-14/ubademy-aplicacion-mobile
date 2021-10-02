import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
  IconButton,
  HStack,
  Divider,
  Center,
  Image
} from 'native-base';
//import { Text, View, Button } from 'react-native';

const FirstPage = () => {
  return(
    <div>
      <Text>Welcome to ubademy!!! =)</Text>
    </div>
  )
}

export default FirstPage