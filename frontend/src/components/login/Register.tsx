import { useState} from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./login.css";

import Logo from "../../assets/images/manager-logo.png";

import { useNavigate } from 'react-router-dom';

const RegisterManager = () => {

  const navigate = useNavigate();

  const [inputRestaurant, setInputRestaurantName] = useState("");

  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputRepeatPassword, setInputRepeatPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event : any) => {
    event.preventDefault();
    
    
    setLoading(true);
    await delay(500);
    console.log(`username :${inputUsername}, Password :${inputPassword}`);

    if(inputPassword !== inputRepeatPassword){
      setShow(true);
      setLoading(false);

    }else{
      setLoading(false);
      navigate( 
        '/'
      );
    }
  
  };

  const handleSingUp = () => {};

  function delay(ms:number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div
      className="sign-in__wrapper"
     
    >
   
      <Form  
            className="shadow-lg p-4 bg-white rounded margin-auto" onSubmit={handleSubmit}>
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Register your restaurant</div>
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
        <Form.Group className="mb-2" controlId="restaurant">
          <Form.Label>Restaurant name</Form.Label>
          <Form.Control
            className="custom-background"
            type="text"
            value={inputRestaurant}
            placeholder="Name of your restaurant"
            onChange={(e) => setInputRestaurantName(e.target.value)}
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
        <Form.Group className="mb-2" controlId="repeat-password">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            className="custom-background"
            type="password"
            value={inputRepeatPassword}
            placeholder="Repeat Password"
            onChange={(e) => setInputRepeatPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="custom-background"
            type="text"
            value={inputEmail}
            placeholder="Email"
            onChange={(e) => setInputEmail(e.target.value)}
            required
          />
        </Form.Group>
        {/* <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group> */}
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Sing up
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Loading...
          </Button>
        )}
     
      </Form>
     
    </div>
  );
};

export default RegisterManager;


