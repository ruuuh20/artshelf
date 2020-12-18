import firebase from './firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

export function createUser(uid, data) {
    return firestore
    .collection('users')
    .doc(uid)
    .set({uid, ...data}, {merge: true})
}

export function createLibrary(data) {
  return firestore.collection('libraries').add(data);
}