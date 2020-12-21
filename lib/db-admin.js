import { db } from './firebase-admin';
import { compareDesc, parseISO } from 'date-fns';

export async function getAllBooks(libraryId, route) {
  try {
    // const snapshot = await db
    let ref = db
      .collection('books')
      .where('libraryId', '==', libraryId)
       .where('status', '==', 'active');
      // .get();

      if (route) {
      ref = ref.where('route', '==', route);
    }

    const snapshot = await ref.get();

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

export async function getAllBooksForLibraries(uid) {
  const { libraries } = await getUserLibraries(uid);

  const snapshot = await db
    .collection('books')
    .where('authorId', '==', uid)
    .get();

  const books = [];

  snapshot.forEach((doc) => {
    books.push({ id: doc.id, ...doc.data() });
  });

  return { books };
}

export async function getLibrary(libraryId) {
  const doc = await db.collection('libraries').doc(libraryId).get();
  const library = { id: doc.id, ...doc.data() };

  return { library };
}
