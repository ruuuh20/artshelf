import {auth} from '@/lib/firebase-admin';
import { getUserLibraries } from '@/lib/db-admin'

export default async (req, res) => {


try {
    // console.log(req)
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { libraries } = await getUserLibraries(uid);
      res.status(200).json({ libraries });
    //  res.status(200).json({ name: 'hi'})
}
catch (error) {
    res.status(500).json({ error })
}


};

// export default (_, res) => {
//     res.status(200).json({ name: 'hi'})
// }