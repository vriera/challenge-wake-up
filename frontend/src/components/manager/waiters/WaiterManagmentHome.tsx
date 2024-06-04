import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import Row from "react-bootstrap/Row";
import "../columns.css";
import { useNavigate, useParams } from 'react-router-dom';
import { MenuItemType } from '../../../models/menuItemType';
import useAuth from '../../../hooks/useAuth';
import styled from 'styled-components';
import Waiters from './Waiters';
import AddWaiterForm from './AddWaiterForm';

const ResponsiveContainer = styled(Container)`
  width: 100%;
  @media (min-width: 992px) {  // This is for 'lg' breakpoint
    max-width: 992px;
  }
`;

function WaiterManagmentHome() {
    const navigate = useNavigate();
    const {auth} = useAuth();
    const { id } = useParams<{ id: string }>();
    const [category , setCategory ] = useState(MenuItemType.ALL);
    useEffect( () => {
      console.log(id)
      if(parseInt(id as string , 10) !== auth.restaurantId){
        console.log("auth")
        console.log(id , parseInt(id as string , 10));
        // navigate('/404')
      }
    }, [])
    useEffect( () => {}, [category])
   
  return (
    <ResponsiveContainer className= "mt-2 p-0 p-md-2">
      <Row>
        <Col className="col-12 col-lg-4">
          <div className="shadow-lg inner-columns rounded">
            <AddWaiterForm managerId={parseInt(id as string , 10)}/>
          </div>
        </Col>
        <Col className="col-12 col-lg-8">
          <div className="shadow-lg inner-columns rounded">
            <Waiters id={auth.id}/>
          </div>
        </Col>
      </Row>
    </ResponsiveContainer>
    
  );  
}

export default WaiterManagmentHome;