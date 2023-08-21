import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const id = book.book_id;
  const handleUpdate = () => {
    navigate(`/update/${id}`);
  };
  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this book?'
    );

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/books/${id}`);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  return (
    <div className="main text-gray-600 w-64 rounded-sm border m-5 flex flex-col justify-between items-center">
      <div className="img  h-80 w-full flex justify-center ">
        <img
          className="w-full rounded-sm"
          src={book.cover}
          alt="cover photo"
        />
      </div>
      <div className="bottom flex flex-col w-full">
        <div className="write flex flex-col w-full justify-center items-center ">
          <div className="title text-lg py-2">{book.title}</div>
          <div className="desc text-sm text-center px-3 pb-3">{book.desc}</div>
        </div>
        <div className='buttons w-full h-8 flex justify-end'>
          <button
            onClick={handleDelete}
            className="bg-indigo-400  w-1/2 text-white rounded-l-sm "
          >
            Delete
          </button>
          <button
            onClick={handleUpdate}
            className="bg-slate-600 w-1/2 text-white rounded-r-sm"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
