import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { PaperProvider } from 'react-native-paper';
import { SignInScreen } from './src/screens/SignInScreen';
import auth from '@react-native-firebase/auth';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ProductsListScreen } from './src/screens/ProductsListScreen';
// import { Camera } from 'react-native-vision-camera';

GoogleSignin.configure({
  webClientId: '385073673756-hor3diuighlrvqlqdd3sail3vcdes3s0.apps.googleusercontent.com',
});

export type AppStackParamList = {
  SignIn: undefined;
  Test: undefined;
  Home: undefined;
  Profile: undefined;
  ProductsList: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();
const Drawer = createDrawerNavigator();

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    // requestPermissions();

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // const requestPermissions = async () => {
  //   const newCameraPermission = await Camera.requestCameraPermission();
  // }

  // Handle user state changes
  const onAuthStateChanged = (user: unknown) => {
    setUser(user);
    console.debug(user);

    if (initializing) setInitializing(false);
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        {initializing ? <></> :
          <>
            {!user ?
              <Stack.Navigator>
                <Stack.Screen name="SignIn" component={SignInScreen} />
              </Stack.Navigator>
              :
              <Drawer.Navigator initialRouteName='ProductsList'>
                {/* <Stack.Screen name="Test" component={TestScreen} /> */}
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="ProductsList" component={ProductsListScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
              </Drawer.Navigator>
            }
          </>
        }
      </NavigationContainer>
    </PaperProvider>
  );
}