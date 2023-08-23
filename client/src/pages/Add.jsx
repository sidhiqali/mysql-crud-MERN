import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Upload from "../utils/Upload";
import axios from "axios";
import { sentRequest } from "../utils/baseUrl";

const Add = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    cover: "",
    desc: "",
    price: 0,
  });
  
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    //cloundinary url
    const url = await Upload(file);

    try {
      if (id) {
        await sentRequest.put(`/books/${id}`, {
          title: data.title,
          cover: url,
          price: data.price,
          desc: data.desc,
        });
      } else {
        await sentRequest.post("/books", {
          title: data.title,
          cover: url,
          price: data.price,
          desc: data.desc,
        });
      }

      console.log("Database operation successful");
      
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error performing database operation:", error);
    
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await sentRequest(
            `/books/${id}`
          );
          const fetchedData = response.data;
          setData({
            title: fetchedData.title,
            desc: fetchedData.desc,
            price: fetchedData.price,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [id]);
  console.log(data);
  return (
    <div className="flex flex-col h-[calc(100vh-200px)] w-full items-center justify-center p-12">
      <div className="text-4xl py-12 text-slate-500">
        {location.pathname === "/add" ? "ADD" : "UPDATE"} YOUR BOOK
      </div>
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-3 block text-base font-medium text-slate-600"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              value={data.title}
              id="name"
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full rounded-md border border-slate-200 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="img-price w-full flex gap-4">
            <div className="mb-5 w-[50%]">
              <label
                htmlFor="cover"
                className="mb-3 block text-base font-medium text-slate-600"
              >
                Upload Cover photo
              </label>
              <input
                type="file"
                name="cover"
                id="name"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full rounded-md border border-slate-200 bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className='mb-5 w-[50%]'>
            <label
              htmlFor='title'
              className='mb-3 block text-base font-medium text-slate-600'
            >
              Price
            </label>
            <input
              type='number'
              name='price'
              value={data.price}
              id='name'
              onChange={handleChange}
              placeholder='$$$'
              className='w-full rounded-md border border-slate-200 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
            />
          </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="desc"
              className="mb-3 block text-base font-medium text-slate-600"
            >
              Description
            </label>
            <textarea
              rows="4"
              name="desc"
              id="message"
              value={data.desc}
              onChange={handleChange}
              placeholder="Type your message"
              className="w-full resize-none rounded-md border border-slate-200 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="hover:cursor-pointer rounded-md w-full bg-[#8580e4] py-3 px-8 text-base font-semibold text-white outline-none"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
