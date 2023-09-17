import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export function createUser(): Promise<FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>> {
    return firestore()
        .collection('MyEntity')
        .add({
            name: 'Ada Lovelace',
            age: 30,
        });
}