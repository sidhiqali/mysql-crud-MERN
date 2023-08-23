import React, { useContext } from "react";
import BookTable from "../components/BookTable";
import UserTable from "../components/UserTable";
import { userContext } from "../context/userContext";
import Error403 from "../components/Error403";

const AdminLanding = () => {
  const { user } = useContext(userContext);
  console.log(user)
  return (
    <>
      {user?.isAdmin ? (
        <section>
          <h1 className="text-3xl font-semibold text-center py-6 text-slate-400">
            ADMIN DASHBOARD
          </h1>
          <div className="details md:flex w-full z-0 gap-3 px-5">
            <div className="booktable md:w-[50%]">
              <BookTable />
            </div>
            <div className="userTable md:w-[50%]">
              <UserTable />
            </div>
          </div>
        </section>
      ) : (
       <Error403 />
      )}
    </>
  );
};

export default AdminLanding;
