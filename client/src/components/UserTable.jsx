import React, { useEffect, useState } from "react";
import { sentRequest } from "../utils/baseUrl";
import { LuEdit } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import avatar from "../assets/images/avatar.jpeg";
const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await sentRequest("/user");
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await sentRequest.delete(`/user/${id}`);
    window.location.reload();
  };

  console.log(users);
  return (
    <>
      <div className="head text-lg font-semibold text-slate-500 text-center py-2 ">
        USERS
      </div>
      <div className="relative overflow-auto min-h-[600px] max-h-[600px] shadow-md rounded-lg">
        <div className="table w-full">
          <table className=" text-sm text-left w-full  text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300 rounded-lg ">
              <tr>
                <th
                  scope="col"
                  className="px-5 py-3"
                >
                  Profile
                </th>
                <th
                  scope="col"
                  className="px-5 py-3"
                >
                  Id
                </th>
                <th
                  scope="col"
                  className="px-5 py-3"
                >
                  Username
                </th>
                <th
                  scope="col"
                  className="px-5 py-3"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-5 py-3"
                >
                  Admin
                </th>
                <th
                  scope="col"
                  className="px-5 py-3"
                >
                  Delete
                </th>
              </tr>
            </thead>
            {users.map((user) => (
              <tbody className="">
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-5 py-4 h-12 w-12 rounded-full font-medium text-gray-900 whitespace-nowrap "
                  >
                    <img
                      src={avatar}
                      alt="book cover"
                    />
                  </th>
                  <td className="px-5 py-4">{user?.id}</td>
                  <td className="px-5 py-4">{user?.username}</td>
                  <td className="px-5 py-4">{user?.email}</td>
                  <td className="px-5 py-4">{user?.isAdmin ? "Yes" : "No"}</td>
                  <td className="px-5 py-4 hover:cursor-pointer">
                    <MdOutlineDelete
                      onClick={() => handleDelete(user?.id)}
                      className="h-5 w-5 text-red-500"
                    />
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

export default UserTable;
