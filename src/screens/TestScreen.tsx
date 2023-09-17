import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { createUser } from '../services/firebase-service';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

interface TestScreenProps {
    navigation: any;
}

export const TestScreen = (props: TestScreenProps) => {
    const [users, setUsers] = useState<any[]>();

    useEffect(() => {
        const usersCollection = firestore().collection('Users');
        usersCollection.get().then(
            (querySnapshot) => {
                setUsers(querySnapshot.docs);
            }
        );

        firestore().collection('Users').onSnapshot((documentSnapshot) => {
            setUsers(documentSnapshot.docs);
        });
    }, []);

    const addUser = () => {
        createUser().then(() => {
            console.log('User added!');
        });
    }

    const logout = () => {
        auth().signOut();
    }

    return (
        <View>
            <Button onPress={addUser} mode='contained'>
                Add user
            </Button>
            <Button onPress={() =>
                props.navigation.navigate('Profile', { name: 'Jane' })
            } mode='outlined'>
                Go to Jane's profile
            </Button>
            <Button onPress={logout} mode='text'>
                Logout
            </Button>

            {(users && users.length) ? (
                <View>
                    {users.map((user, index) =>
                        <View key={index}>
                            <Text>{user.data().name}</Text>
                        </View>
                    )}
                </View>
            ) : <></>}
        </View>
    );
};

