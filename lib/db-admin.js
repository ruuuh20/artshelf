import { db } from './firebase-admin';
import { compareDesc, parseISO } from 'date-fns';

export async function getAllBooks(libraryId) {
  try {
    const snapshot = await db
      .collection('books')
      .where('libraryId', '==', libraryId)
      .get();

      const books = [];

    snapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });

    books.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return { books };
  } catch (error) {
    return { error };
  }
}

export async function getAllLibraries() {

    const snapshot = await db.collection('libraries').get();
    const libraries = [];

    snapshot.forEach((doc) => {
      libraries.push({ id: doc.id, ...doc.data() });
    });

    return { libraries };

 
  
}

export async function getUserLibraries(uid) {
  const snapshot = await db
    .collection('libraries')
    .where('authorId', '==', uid)
    .get();

  const libraries = [];

  snapshot.forEach((doc) => {
    libraries.push({ id: doc.id, ...doc.data() });
  });

  return { libraries };
}