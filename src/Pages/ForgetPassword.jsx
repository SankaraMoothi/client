import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { URL } from "../config";

const ForgotPassword = () => {
  const [message, setMessage] = useState(false);
  const formValidation = yup.object({
    email: yup.string().required("*Email is mandatory"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: formValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        const user = await axios.post(`${URL}/users/sendpasswordlink`, values);
        // console.log(values);
        resetForm({ values: "" });
        setMessage(true);
      } catch (error) {
        console.log(error);
        alert(error.response.data);
      }
    },
  });

  return (
    <div className="login-section">
      <div className="form-container">
        <h3 className="text-center">Forgot Password</h3>
        <form onSubmit={formik.handleSubmit}>
          {message ? (
            <p style={{ color: "green", fontWeight: "bold" }}>
              Password reset link sent to your email!!!
            </p>
          ) : (
            <></>
          )}
          <input
            type="email"
            id="email"
            className="inputs"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Enter Email"
          />
          <div className="register-container">
            <input type="submit" value="Send link" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
