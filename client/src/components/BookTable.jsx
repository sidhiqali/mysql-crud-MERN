import React, { useEffect, useState } from "react";
import { sentRequest } from "../utils/baseUrl";
import { LuEdit } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
const BookTable = () => {
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await sentRequest.get("/books");
        const data = response.data;
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleAdd = () => {
    navigate("/add");
  };

  const handleDelete = async (id) => {
    await sentRequest.delete(`/books/${id}`);
    window.location.reload();
  };

  console.log(books);
  return (
    <>
      <div className="head flex items-center justify-between px-6 py-2">
        <div className="head font-semibold text-lg text-slate-500">BOOKS</div>
        <button
          onClick={handleAdd}
          type="button"
          className="focus:outline-none h-7 text-white bg-slate-400  border-slate-300 border font-sm rounded-lg text-xs px-3 py-1 mr-2"
        >
          Add Books
        </button>
      </div>
      <div className="relative  overflow-auto max-h-[600px] shadow-md rounded-lg">
        <div className="table w-full">
          <table className="w-full  text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300 rounded-lg ">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3"
                >
                  Cover
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                >
                  Id
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                >
                  Update
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                >
                  Delete
                </th>
              </tr>
            </thead>
            {books.map((book) => (
              <tbody className="">
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 h-10 w-16 font-medium text-gray-900 whitespace-nowrap "
                  >
                    <img
                      src={book?.cover}
                      alt="book cover"
                    />
                  </th>
                  <td className="px-6 py-4">{book?.id}</td>
                  <td className="px-6 py-4">{book?.title}</td>
                  <td className="px-6 py-4">{book?.price}</td>
                  <td className="px-6 py-4">
                    <Link to={`/update/${book?.id}`}>
                      <LuEdit className="h-5 w-5 hover:cursor-pointer text-[#3495a7]" />
                    </Link>
                  </td>
                  <td
                    onClick={() => handleDelete(book?.id)}
                    className="px-6 py-4"
                  >
                    <MdOutlineDelete className="h-5 hover:cursor-pointer w-5 text-red-600" />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default BookTable;
