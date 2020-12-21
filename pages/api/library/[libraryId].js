import { getLibrary } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { libraryId } = req.query;
    const { library } = await getLibrary(libraryId);
    res.status(200).json({ library });
  } catch (error) {
    res.status(500).json({ error });
  }
};