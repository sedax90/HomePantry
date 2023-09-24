import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export class FirebaseService {
    static createUser(): Promise<FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>> {
        return firestore()
            .collection('MyEntity')
            .add({
                name: 'Ada Lovelace',
                age: 30,
            });
    }
} 