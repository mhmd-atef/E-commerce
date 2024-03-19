import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { authContext } from "../Context/authentication";

// Handling Exception => try catch

export default function Login() {
  const { setToken } = useContext(authContext);

  let user = {
    email: "",
    password: "",
  };

  const [errMsg, setErrMsg] = useState(null);
  const [sussMsg, setSussMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function loginAccount(x) {
    setLoading(true);
    console.log("Sending to backend");
    setErrMsg(null);

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        x
      );

      console.log(data, "data from login user");

      if (data.message === "success") {
        
        // success message for user => navigate for login
        console.log(data.token, setToken, "tookeen");
        localStorage.setItem("tkn", data.token);
        setToken(data.token);

        setSussMsg("Welcome Back");

        setTimeout(() => {
          return navigate("/Profile");
        }, 2000);
      }
    } catch (err) {
      setErrMsg(err.response.data.message);
    }
    setLoading(false);

  }

  const myFormik = useFormik({
    initialValues: user,

    onSubmit: loginAccount,

    validate: function (x) {
      setErrMsg(null);
      setSussMsg(null);

      const errors = {};

      if (x.email.includes("@") === false || x.email.includes(".") === false) {
        errors.email = "Email is invalid";
      }

      if (x.password.length < 5 || x.password.length > 15) {
        errors.password = "Password must be between 5 to 15 characters";
      }

      return errors;
    },
  });

  return (
    <>
      <div className="w-75 p-4 m-auto ">
        {errMsg ? <div className="alert alert-danger"> {errMsg}</div> : ""}
        {sussMsg ? <div className="alert alert-success">{sussMsg} </div> : ""}

        <h3 className="text-center">Login Now :</h3>

        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            className="form-control mb-3"
            placeholder="Email"
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.email}
            type="email"
          />
          {myFormik.errors.email && myFormik.touched.email ? (
            <div className="alert alert-danger">{myFormik.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password :</label>
          <input
            id="password"
            className="form-control mb-3"
            placeholder="Password"
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.password}
            type="password"
          />
          {myFormik.errors.password && myFormik.touched.password ? (
            <div className="alert alert-danger">{myFormik.errors.password}</div>
          ) : (
            ""
          )}

          <div className="d-flex justify-content-between align-items-between">
            <h5>
              <Link to="/forgetPass" className="ffdd">
                forget your password?{" "}
              </Link>
            </h5>
            <button
              className="btn btn-outline-success btn-lg"
              disabled={myFormik.dirty === false || myFormik.isValid === false}
              type="submit"
            >
              <Link to="/profile">
                {loading ? (
                  <ThreeCircles
                    height="25"
                    width="50"
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass="black"
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor="#198754"
                    innerCircleColor="#4fa94d"
                    middleCircleColor="green"
                  />
                ) : (
                  "Login Now"
                )}
              </Link>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
