import Book from '../models/book.js'; // Import the Book model

export const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
};

export const getBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching book' });
  }
};

export const createBook = async (req, res) => {
  const { title, desc, cover } = req.body;
  try {
    const book = await Book.create({ title, desc, cover });
    res.json({ message: 'Book created successfully', book });
  } catch (error) {
    res.status(500).json({ error: 'Error creating book' });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await book.destroy();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book' });
  }
};

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, desc, cover } = req.body;
    try {
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      if (title) book.title = title;
      if (desc) book.desc = desc;
      if (cover) book.cover = cover;
      
      await book.save();
      res.json({ message: 'Book updated successfully', book });
    } catch (error) {
      res.status(500).json({ error: 'Error updating book' });
    }
  };
  
