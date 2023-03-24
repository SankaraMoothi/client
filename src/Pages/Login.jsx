import axios from "axios";

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { URL } from "../config";
const Login = () => {
  const google = () => {
    window.open(`https://oauth-react.onrender.com/auth/google`, "_self");
  };

  const github = () => {
    window.open(`https://server-oathu.vercel.app/auth/github`, "_self");
  };

  const facebook = () => {
    window.open(`https://server-oathu.vercel.app/auth/facebook`, "_self");
  };
  const [userEmail, setUserEmail] = useState("");
  const [Pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = await axios.post(`${URL}/users/login`, {
      email: userEmail,
      password: Pass,
    });
    alert(data.data.message);
    navigate("/");
  };

  return (
    <div className="login">
      <div className="wrapper">
        <div className="left">
          <h1 className="loginTitle">Choose a Login Method</h1>
          <div className="singleLine">
            <div className="loginButton google" onClick={google}>
              <i className="fa-brands fa-google"></i>
            </div>
            <div className="loginButton facebook" onClick={facebook}>
              <i className="fa-brands fa-facebook"></i>
            </div>
            <div className="loginButton github" onClick={github}>
              <i className="fa-brands fa-github"></i>
            </div>
          </div>
          <input
            type="email"
            placeholder="Username"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={Pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button className="submit" onClick={handleLogin}>
            Login
          </button>
          <p>
            Forget Password <Link to="/forgot-password">Click Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
