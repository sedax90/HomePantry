import { Button } from "react-native-paper";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface SignInScreenProps {
  navigation: any;
}

export const SignInScreen = (props: SignInScreenProps) => {
  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <Button
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    >Google Sign-In</Button>
  );
};

