import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { sentRequest } from "../utils/baseUrl";
import { userContext } from "../context/userContext";
const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { user, setUser } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await sentRequest.post(
        "/auth/login",
        {
          email: data?.email,
          password: data?.password,
        },
        config
      );

      setUser(result.data); // Set the user state directly from the result

      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data || "An error occurred");
    }
    setLoading(false);
  };

  console.log(user);
  console.log(data);
  return (
    <div className="flex min-h-[calc(100vh-150px)] flex-1 text-gray-400 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-500">
          Sign In
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium leading-6 text-gray-500"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="example@example.com"
                required
                onChange={handleChange}
                className="w-full rounded-md border-2 placeholder-gray-300 border-slate-200 bg-white py-2 px-4 text-md font-sm text-[#6B7280] outline-none focus:border-slate-300 focus:shadow-md"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-md font-medium leading-6 text-gray-500"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                required
                onChange={handleChange}
                className="w-full rounded-md border-2 placeholder-gray-300 border-slate-200 bg-white py-2 px-4 text-md font-sm text-[#6B7280] outline-none focus:border-slate-300 focus:shadow-md"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gradient-to-r from-[#31a9bd] to-[#378499] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
            >
              {loading ? "Signing In..." : "Sign in"}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <p className="mt-6 text-center text-sm text-gray-500">
            Not a member?{" "}
          </p>
          <Link to="/register">
            <div className="mt-6  font-semibold leading-6 text-[#31a9bd] hover:text-[#55aebd]">
              Register
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
