import { getBook } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { bookId } = req.query;
    const { book } = await getBook(bookId);
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ error });
  }
};