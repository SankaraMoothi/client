import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";

import Home from "./Pages/Home";
import Login from "./Pages/Login";

function App() {
  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch(`https://server-oathu.vercel.app/auth/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setLoginData(resObject.user);
          console.log(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <div className="container">
      <Navbar user={loginData} />
      <Routes>
        <Route path="/" element={<Home user={loginData} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
