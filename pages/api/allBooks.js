import { auth } from '@/lib/firebase-admin';
// import { getUserBooks } from '@/lib/db-admin';
import { getAllBooksTotal } from '@/lib/db-admin'

export default async (req, res) => {
  try {
    //   const idTokenResult = await user.getIdTokenResult();
// const idToken = idTokenResult.token;
   

    const { books } = await getAllBooksTotal;

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error });
  }
};

