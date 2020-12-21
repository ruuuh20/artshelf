
import { getAllBooks } from '@/lib/db-admin';

export default async (req, res) => {
    try {
        const [libraryId , route]= req.query.library;
        const { books } = await getAllBooks(libraryId, route);
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ error });
    }

};