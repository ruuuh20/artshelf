import db from '@/lib/firebase-admin';
import { getAllBooks } from '@/lib/db-admin';

export default async (req, res) => {
  const libraryId = req.query.libraryId;
  const { books, error } = await getAllBooks(libraryId);

  if (error) {
    res.status(500).json({ error });
  }

  res.status(200).json({ books });
};