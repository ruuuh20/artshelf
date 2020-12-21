
import { getAllBooks, getLibrary } from '@/lib/db-admin';

export default async (req, res) => {
  const libraryId = req.query.libraryId;
  const { books, error } = await getAllBooks(libraryId);
  const { library } = await getLibrary(library)

  if (error) {
    res.status(500).json({ error });
  }

  res.status(200).json({ books, library });
};