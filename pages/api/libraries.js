import db from '@/lib/firebase-admin';

export default async (_, res) => {
  const snapshot = await db.collection('libraries').get();
  const libraries = [];

  snapshot.forEach((doc) => {
    libraries.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json({ libraries });
};

// export default (_, res) => {
//     res.status(200).json({ name: 'hi'})
// }