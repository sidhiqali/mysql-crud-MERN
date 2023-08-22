import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";
import { sentRequest } from "../utils/baseUrl";

const PaginationExample = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await sentRequest("/books");
        const data = response.data;
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="main bg-[#f2f0f0] px-10 flex flex-col items-center">
      <div className="head flex justify-around items-center py-2">
        <div className="text-3xl font-semibold text-slate-400 my-3">
          Available Collection
        </div>
      </div>
      <div className="second flex flex-wrap">
        {currentBooks.map((book) => (
          <BookCard
            key={book?.id}
            book={book}
          />
        ))}
      </div>
      <div className="pagination py-5 text-slate-500">
        <button
          className="pagination-button mr-3 bg-[#32a4bd] w-20 rounded-md text-sm text-slate-100 px-3 py-2"
          onClick={prevPage}
        >
          Previous
        </button>
        <span className="page-info">
          Page <span className="text-[#32a4bd] text-lg ">{currentPage}</span> of{" "}
          {totalPages}
        </span>
        <button
          className="pagination-button ml-3 bg-[#32a4bd] w-20 rounded-md text-sm text-slate-100 px-3 py-2"
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationExample;
