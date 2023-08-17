import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/add");
  };
  return (
    <nav className="bg-indigo-400">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <div className="text-3xl px-16 text-white">BookStore</div>
        </Link>
        <button
          onClick={handleAdd}
          type="button"
          className="focus:outline-none w-24 h-10 text-white bg-indigo-800 hover:bg-indigo-800 border-slate-500 border font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          ADD
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
