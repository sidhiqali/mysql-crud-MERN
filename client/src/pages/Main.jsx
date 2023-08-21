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
    </div>
  );
};

export default Main;
