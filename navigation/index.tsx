/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import logo from '../assets/images/logo.png';
import { Image, StyleSheet, Text, View, TextInput, Dimensions, Button, SafeAreaView } from 'react-native';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <View style={styles.container}>
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Image source={logo} style={{ width: 200, height: 109,  marginVertical: 15}} />
      <Text style={{ color: '#fffc00', fontStyle: 'italic'}}> Mail o contraseña incorrecta</Text>
      <View style={styles.inputContainer}>
        <Text>Mail</Text>
        <TextInput style={styles.input}/>
        <Text>Contraseña</Text>
        <TextInput secureTextEntry={true} style={styles.input} />
      </View>
      <Button
        title="Iniciar Sesión"
        color="#4697d0"
      />
      <Text style={{ color: '#ffffff', fontStyle: 'italic', marginVertical: 20 }}> ¿Olvidó su contraseña?</Text>
      <Text style={{ color: '#000000', marginVertical: 5 }}> ¿No tienes cuenta?</Text>
      <Button
        title="Registrate"
        color="#033c63"
      />
    </NavigationContainer>
    </View>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
*/
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
  <BottomTab.Navigator
    initialRouteName="TabOne"
    screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme].tint,
    }}>
    <BottomTab.Screen
      name="TabOne"
      component={TabOneScreen}
      options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
        title: 'Tab One',
        tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        headerRight: () => (
          <Pressable
            onPress={() => navigation.navigate('Modal')}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}>
            <FontAwesome
              name="info-circle"
              size={25}
              color={Colors[colorScheme].text}
              style={{ marginRight: 15 }}
            />
          </Pressable>
        ),
      })}
    />
    <BottomTab.Screen
      name="TabTwo"
      component={TabTwoScreen}
      options={{
        title: 'Tab Two',
        tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
      }}
    />
  </BottomTab.Navigator>
  );
}
*/
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const {width, height} = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#257363',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: width / 1.3,
    backgroundColor: "grey",
    marginVertical: 5
  },
  inputContainer: {
    marginVertical: 5
  }
});
