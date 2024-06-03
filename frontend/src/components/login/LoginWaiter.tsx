import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./login.css";
import {  loginWaiter } from "../../api/auth";
import Logo from "../../assets/images/waiter.png";
import { jwtDecode } from "jwt-decode";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { JWTPayload } from "../../models/jwtPayload";

//https://codesandbox.io/p/sandbox/reactjs-bootstrap-login-form-2botkz?file=%2Fsrc%2Fcomponents%2Flogin%2FLogin.js%3A1%2C1-112%2C1

const LoginWaiter = () => {
  const navigate = useNavigate();
  const {setAuth} = useAuth();
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event : any) => {
    event.preventDefault();
    setLoading(true);
    // await delay(500);
    // console.log(`Username :${inputUsername}, Password :${inputPassword}`);
    try{
        const res = await loginWaiter({restaurant:inputUsername , token:inputPassword})
        if(res.data){
            const token = res.data.access_token;
            const decoded = (jwtDecode(token) as JWTPayload)
            setAuth({token:token , role: decoded.type, id:decoded.sub , name:decoded.username , restaurantId:decoded.restaurantId});
        }
    }catch(e){
        setShow(true);

    }
 
    setLoading(false);
    navigate( 
      '/'
    );
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
        <div className="h4 mb-2 text-center">Waiter Sign In</div>
        {/* ALert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect restaurant or token.
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Restaurant</Form.Label>
          <Form.Control
            className="custom-background"
            type="text"
            value={inputUsername}
            placeholder="Restaurant"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Token</Form.Label>
          <Form.Control
            className="custom-background"
            type="password"
            value={inputPassword}
            placeholder="Token"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        {/* <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group> */}
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
        <div className="d-grid justify-content-end">
          {/* <Button
            className="text-muted px-0"
            variant="link"
            onClick={handlePassword}
          >
            Forgot password?
          </Button> */}
        </div>
      </Form>
     
    </div>
  );
};

export default LoginWaiter;


