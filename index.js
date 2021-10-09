import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { makeServer } from './src/mirage-server/server';
import App from './App';

if (process.env.NODE_ENV === 'development') {
    makeServer({ environment: 'development' });
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
