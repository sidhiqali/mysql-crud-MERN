import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://booklibrary-4sox.onrender.com/books"
        );
        console.log(response);
        const data = response.data;
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);
  console.log(books);
  return (
    <div className="main px-10">
      <div className="head  flex justify-around items-center py-5">
        <div className="text-6xl border-b-2 text-slate-400 my-8">BOOKSTORE</div>
      </div>
      <div className="second flex flex-wrap">
        {books.map((book) => (
          <BookCard
            key={book?.book_id}
            book={book}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
