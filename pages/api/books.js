import { auth } from '@/lib/firebase-admin';
// import { getUserBooks } from '@/lib/db-admin';
import { getAllBooksForLibraries } from '@/lib/db-admin'

export default async (req, res) => {
  try {
    //   const idTokenResult = await user.getIdTokenResult();
// const idToken = idTokenResult.token;
    const { uid } = await auth.verifyIdToken(req.headers.token);
    // const { uid } = await auth.verifyIdToken(idToken);
    const { books } = await getAllBooksForLibraries(uid);

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error });
  }
};

