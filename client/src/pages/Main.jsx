<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";
import Feature from "../components/Feature";
import FetchBook from "../components/FetchBook";
import Publishers from "../components/Publishers";

const Main = () => {
  
  return (
    <div className="main">
     <Feature />
     <Publishers />
     <FetchBook />
=======
import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import axios from 'axios';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books');
        console.log(response);
        const data = response.data;
        setBooks(data);
      } catch (error) {
        console.error('Error on fetching books:', error);
      }
    };

    fetchBooks();
  }, []);
  console.log(books);
  return (
    <div className='main px-10'>
      <div className='head  flex justify-around items-center py-5'>
        <div className='text-6xl border-b-2 text-slate-400 my-8'>BOOKSTORE</div>
      </div>
      <div className='second flex flex-wrap'>
        {books.map((book) => (
          <BookCard key={book?.book_id} book={book} />
        ))}
      </div>
>>>>>>> origin/main
    </div>
  );
};

export default Main;
