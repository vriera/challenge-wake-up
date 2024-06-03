import React from 'react';
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import styled from 'styled-components';
import "./error.css";
import errorImage from "../../assets/images/404.jpg";
const ResponsiveContainer = styled(Container)`
  @media (min-width: 992px) {  // This is for 'lg' breakpoint
    max-width: 992px;
  }
`;

const NotFound = () => {
  return (
    <div className="wrapper">
      <ResponsiveContainer className="margin-auto">
          <Card className="error-card">
                    <Card.Img variant="top" className="img-size" src={errorImage} alt="404 Not Found" />
                    <Card.Body>
                        <Card.Title  className="black-text">404 - Not Found</Card.Title>
                        <Card.Text  className="black-text">
                            Sorry, the page you are looking for does not exist.
                        </Card.Text>
                    </Card.Body>
                </Card>
      </ResponsiveContainer>
    </div>
  );
}

export default NotFound;