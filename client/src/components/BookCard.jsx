import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { sentRequest } from '../utils/baseUrl';
const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const id = book.id;

  const handleUpdate = () => {
    navigate(`/update/${id}`);
  };
  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this book?'
    );

    if (confirmed) {
      try {
        await sentRequest.delete(`/books/${id}`);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  return (
    <div className='main   text-gray-600 shadow-inner w-64 rounded-md border border-slate-200 pb-2 m-5 flex flex-col justify-between items-center'>
      <div className='img p-3  h-80 w-full flex justify-center '>
        <img
          className='w-full rounded-md shadow-md hover:shadow-2xl '
          src={book.cover}
          alt='cover photo'
        />
      </div>
      <div className='bottom flex flex-col w-full px-3'>
        <div className='write flex flex-col w-full p-1 justify-center items-center '>
          <div className='head flex items-center  justify-between '>
            <div className='title text-lg text-slate-700 text-center '>
              {book.title}
            </div>
          </div>
          <div className='desc text-sm text-center text-slate-500 pb-3'>
            {book.desc}
          </div>
        </div>
        <div className='buttons w-full h-8 flex justify-end'>
          <button className=' bg-gradient-to-r from-[#31a9bd] to-[#378499] hover:bg-[#25cbe8] mx-5  w-full text-white rounded-md flex justify-around items-center'>
            {' '}
            <span>₹{book.price}</span>
            <span>Purchase</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
