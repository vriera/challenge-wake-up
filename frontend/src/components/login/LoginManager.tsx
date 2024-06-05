import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert  from "react-bootstrap/Alert";

import "./login.css";
import Logo from "../../assets/images/manager-logo.png";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { JWTPayload } from "../../models/jwtPayload";
import { loginManager } from "../../api/auth";
const LoginManager = () => {

  const navigate = useNavigate();

  const {setAuth} = useAuth();
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSingUp = async () => {
    console.log("singUp")
    navigate('/register')
  }

  const handleSubmit = async (event : any) => {
    event.preventDefault();
    setLoading(true);
    // await delay(500);
    // console.log(`Username :${inputUsername}, Password :${inputPassword}`);
    try{
        const res = await loginManager({username:inputUsername , password:inputPassword})
        try{
            const token = res.data.access_token;
            const decoded = (jwtDecode(token) as JWTPayload)
            setAuth({token:token , role: decoded.type, id:decoded.sub , name:decoded.username , restaurantId:decoded.restaurantId});
          }catch(e){
            console.log("some error" , e);
          }


          navigate( 
            '/manager/menu'
          );
    }catch(e){
         setLoading(false);
        setShow(true);
    }
 
   
  };

//   const handlePassword = () => {};

//   function delay(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }

  return (
    <div
      className="sign-in__wrapper"
      
    >
      {/* Overlay */}
      {/* <div className="sign-in__backdrop"></div> */}
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded margin-auto" onSubmit={handleSubmit}>
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Manager Sign In</div>
        {/* ALert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect username or password.
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            className="custom-background"
            type="text"
            value={inputUsername}
            placeholder="Username"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="custom-background"
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        {/* <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group> */}
        <br></br>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
        <hr></hr>
       <div className=" w-100 d-grid justify-content-center">
          <span className="me-2">Don't have your restaurant registered yet?</span>
          <Button
            className="text-muted"
            variant="link"
            onClick={handleSingUp}
          >
            Sign up
          </Button>
        </div>
      </Form>
     
    </div>
  );
};

export default LoginManager;


