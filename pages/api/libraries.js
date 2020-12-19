import {auth} from '@/lib/firebase-admin';
import { getUserLibraries } from '@/lib/db-admin'

export default async (req, res) => {
//   const snapshot = await db.collection('libraries').get();
//   const libraries = [];
// const { libraries, error } = await getAllLibraries();

//   snapshot.forEach((doc) => {
//     libraries.push({ id: doc.id, ...doc.data() });
//   });
try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { libraries } = await getUserLibraries(uid);
      res.status(200).json({ libraries });
}
catch (error) {
    res.status(500).json({ error })
}


};

// export default (_, res) => {
//     res.status(200).json({ name: 'hi'})
// }