import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../config";

const PasswordReset = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();
  console.log(id, token);

  const userValid = async () => {
    const validUser = await axios.get(`${URL}/resetpassword/${id}/${token}`);

    if (validUser) {
      console.log("ValidaUser");
    } else {
      console.log("Invalid user");
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      cpassword: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const user = await axios.post(`${URL}/users/${id}/${token}`, values);
        alert(user.data.message);
        // console.log(values);
        resetForm({ values: "" });
        navigate("/");
      } catch (error) {
        console.log(error);
        alert(error.response.data);
      }
    },
  });

  return (
    <div className="login-section">
      <div className="form-container">
        <h3 className="text-center">Password Reset</h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="password">New Password</label>
          <input
            type={"password"}
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="inputs"
            placeholder="Enter your new password"
          />
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type={"password"}
            id="cpassword"
            name="cpassword"
            onChange={formik.handleChange}
            value={formik.values.cpassword}
            className="inputs"
            placeholder="Confirm your new password"
          />
          <div className="register-container">
            <input
              type="submit"
              className="btn btn-primary mt-2"
              value="Reset"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
