import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import ForgetPassword from "./Pages/ForgetPassword";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import PasswordRest from "./Pages/PasswordRest";

function App() {
  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch(`https://oauth-react.onrender.com/auth/login/success`, {
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
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:id/:token" element={<PasswordRest />} />
      </Routes>
    </div>
  );
}

export default App;
