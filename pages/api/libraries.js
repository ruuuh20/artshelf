import {auth } from '@/lib/firebase-admin';
import { getUserLibraries } from '@/lib/db-admin'

export default async (req, res) => {

  try {
      const { uid } = await auth.verifyIdToken(req.headers.token);
      const { libraries } = await getUserLibraries(uid);
    
      res.status(200).json({ libraries });
  }
  catch (error) {
      res.status(500).json({ error })
  }
};