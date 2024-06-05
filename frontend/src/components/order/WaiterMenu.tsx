import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InfiniteMenu from '../itemCard/InfiniteMenu';
import CategorySelector from '../selector/CategorySelector';
import "../style.css";
import { useNavigate, useParams } from 'react-router-dom';
import { MenuItemType } from '../../models/menuItemType';
import useAuth from '../../hooks/useAuth';
import styled from 'styled-components';
import OrderSummary from './OrderSummary';
import RestaurantName from '../RestaurantName';

const ResponsiveContainer = styled(Container)`
  width: 100%;
  @media (min-width: 1200px) {  // This is for 'lg' breakpoint
    max-width: 1200px;
  }
`;

function WaiterMenu() {
    const navigate = useNavigate();
    const {auth} = useAuth();
    const { id } = useParams<{ id: string }>();
    const [category , setCategory ] = useState(MenuItemType.ALL);



   
  return (
    <ResponsiveContainer className= "mt-2 p-0 p-md-2">
      <RestaurantName></RestaurantName>
      <Row>
        <Col className="col-12 col-lg-4">
          <div className="shadow-lg inner-columns rounded">
            <OrderSummary waiterId={auth.id} managerId={auth.restaurantId}/>
          </div>
        </Col>
        <Col className="col-12 col-lg-8">
          <div className="shadow-lg inner-columns rounded">
            <CategorySelector onSelectCategory={setCategory}/>
            <InfiniteMenu id={auth.restaurantId} category={category}/>
          </div>
        </Col>
      </Row>
    </ResponsiveContainer>
    
  );  
}

export default WaiterMenu;