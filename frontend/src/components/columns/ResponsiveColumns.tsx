import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import Row from "react-bootstrap/Row";
import InfiniteMenu from '../itemCard/InfiniteMenu';
import CategorySelector from '../selector/CategorySelector';
import "./columns.css";


function ResponsiveColumns() {
  return (
    <Container className= "mt-2">
      <Row>
        <Col className="col-12 col-lg-4">
          <div className="shadow-lg inner-columns rounded">
            
          </div>
        </Col>
        <Col className="col-12 col-lg-8">
          <div className="shadow-lg inner-columns rounded">
            <CategorySelector onSelectCategory={()=> {return}}/>
          </div>
        </Col>
      </Row>
    </Container>
    
  );  
}

export default ResponsiveColumns;