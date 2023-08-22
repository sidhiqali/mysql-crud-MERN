import { Link } from "react-router-dom";
import avatar from "../assets/images/avatar.jpeg";
import { useContext } from "react";
import { userContext } from "../context/userContext";
import { sentRequest } from "../utils/baseUrl";
import { toast } from "react-hot-toast";
const Navbar = () => {
  const { user, setUser } = useContext(userContext);
  const handleLogout = async () => {
    try {
      await sentRequest.post("/auth/logout");
      setUser(null);
      toast.success("logout successfully");
    } catch (error) {
      toast.error(error?.response?.data || "an error occured while logout");
    }
  };
  return (
    <nav className="bg-[#f0f0f0] sticky top-0">
      <d
        iv
        className="max-w-screen-xl flex items-center justify-between mx-auto p-4"
      >
        <Link to="/">
          <div className="text-3xl font-semibold text-[#438490] px-16">
            BookStore
          </div>
        </Link>
        {/* <button
          onClick={handleAdd}
          type="button"
          className="focus:outline-none w-24 h-10 text-white bg-slate-400 hover:bg-indigo-800 border-slate-300 border font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          ADD
        </button> */}
        <div className="list flex">
          {user ? (
            <div className="flex items-center px-4">
              <div className="profile h-11 flex items-center mx-3 border shadow-inner border-slate-00 pr-2 rounded-3xl bg-[#e8e7e7]">
                <div className="avtr mr-2 h-10 w-10 ">
                  <img
                    className="rounded-full"
                    src={avatar}
                    alt="avatar"
                  />
                </div>
                <div className="name font-medium text-slate-600 mx-1">
                  {user?.username.toUpperCase()}
                </div>
              </div>
              <button className="relative  inline-flex items-center justify-center p-0.5 mx-3 overflow-hidden text-sm font-medium text-gray-00 rounded-lg group bg-gradient-to-br from-slate-300 w-24 to-slate-400   hover:text-white  focus:outline-none">
                <span
                  onClick={handleLogout}
                  className="relative w-24 px-5 py-2 transition-all ease-in duration-75 bg-[#f0f0f0]  rounded-md group-hover:bg-opacity-0"
                >
                  Logout
                </span>
              </button>
            </div>
          ) : (
            <div className="px-4">
              <Link to="/login">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-cyan-500 w-24 to-[#0d6491] hover:bg-gradient-to-bl focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="relative  inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 w-24 to-[#0d6491]   hover:text-white  focus:outline-none">
                  <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-[#f0f0f0]  rounded-md group-hover:bg-opacity-0">
                    Register
                  </span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </d>
    </nav>
  );
};

export default Navbar;
