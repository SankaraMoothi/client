import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import * as yup from "yup";

import { URL } from "../config";
const Login = () => {
  const google = () => {
    window.open(`http://localhost:5000/auth/google`, "_self");
  };

  const github = () => {
    window.open(`http://localhost:5000/auth/github`, "_self");
  };

  const facebook = () => {
    window.open(`http://localhost:5000/auth/facebook`, "_self");
  };
  const [userEmail, setUserEmail] = useState("");
  const [Pass, setPass] = useState("");

  const navigate = useNavigate();
  const formValidation = yup.object({
    name: yup.string().required("*Name is mandatory"),
    email: yup.string().required("*Email is mandatory").min(3),
    password: yup
      .string()
      .required("*Password field is mandatory")
      .min(6)
      .max(15),
    cpassword: yup.string().required("*Confirm your password").min(6).max(15),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: formValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (values.password === values.cpassword) {
          const data = await axios.post(`${URL}/users/register`, values);

          alert(data.data.message);
          resetForm({ values: "" });
          navigate("/");
        } else {
          alert("Password mismatch");
        }
      } catch (error) {
        alert(error.response.data);
      }
    },
  });
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

        <div className="right">
          <h1>Register As New User</h1>

          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Username"
          />
          <input
            type="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Password"
          />
          <input
            type="password"
            name="cpassword"
            onChange={formik.handleChange}
            value={formik.values.cpassword}
            placeholder="Conform_Password"
          />
          <button type="submit" onClick={formik.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
