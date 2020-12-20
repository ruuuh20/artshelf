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
  const library = firestore.collection('libraries').doc();
  //creates the reference to the document and gives ID
  library.set(data);
  return library;
}

export function createBook(data) {
  return firestore.collection('books').add(data);
}

export function deleteBook(id) {
  return firestore.collection('books').doc(id).delete();
}

//this is creating through client side