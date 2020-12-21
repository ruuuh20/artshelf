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

export async function updateLibrary(id, newValues) {
  return firestore.collection('libraries').doc(id).update(newValues);
}

export async function deleteLibrary(id) {
  firestore.collection('books').doc(id).delete();
  const snapshot = await firestore
    .collection('libraries')
    .where('libraryId', '==', id)
    .get();

  const batch = firestore.batch();
  //delete all books associated with the lib

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();

}

export function createBook(data) {
  return firestore.collection('books').add(data);
}

export async function updateBook(id, newValues) {
  return firestore.collection('books').doc(id).update(newValues);
}

export function deleteBook(id) {
  return firestore.collection('books').doc(id).delete();
}

//this is creating through client side