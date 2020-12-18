import db from '@/lib/firebase-admin';
import { getAllLibraries } from '@/lib/db-admin'

export default async (_, res) => {
//   const snapshot = await db.collection('libraries').get();
//   const libraries = [];
const { libraries, error } = await getAllLibraries();

//   snapshot.forEach((doc) => {
//     libraries.push({ id: doc.id, ...doc.data() });
//   });
if (error) {
    res.status(500).json({ error })
}

  res.status(200).json({ libraries });
};

// export default (_, res) => {
//     res.status(200).json({ name: 'hi'})
// }