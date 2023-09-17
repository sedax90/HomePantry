import { Button } from 'react-native';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen = (props: HomeScreenProps) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        props.navigation.navigate('Profile', { name: 'Jane' })
      }
    />
  );
};

