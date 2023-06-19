import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Navbarf from "./Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsername("");
    setPassword("");
  };

  const Loginbtn = async() => {
    try {
      let data = await fetch("http://localhost:5003/api/login/", {
        method: "post",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
     const res = await data.json();
      console.log(res);
      if(res.token){
        localStorage.setItem("token", res.token);
        navigate('/')
      }
      else{
        console.log("error")
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Navbarf />
      <Form className="vh-25" onSubmit={handleSubmit}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                       src={require("../Assets/login.jpeg")}
                      alt="login form"
                      className="img-fluid mt-4 "
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">                  
                        <div className="d-flex align-items-center mb-3 pb-1">                     
                          <span className="h1 fw-bold mb-0">Login</span>
                        </div>

                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                           Username
                          </label>
                          <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            type="text"
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control form-control-lg"
                            required
                          />
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                            onClick={Loginbtn}
                          >
                            Login
                          </button>
                        </div>                  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
