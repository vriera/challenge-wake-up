import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import Row from "react-bootstrap/Row";
import InfiniteMenu from '../itemCard/InfiniteMenu';
import CategorySelector from '../selector/CategorySelector';
import "../style.css";
import { useNavigate, useParams } from 'react-router-dom';
import AddItemForm from './AddItemForm';
import { MenuItemType } from '../../models/menuItemType';
import useAuth from '../../hooks/useAuth';
import styled from 'styled-components';
import RestaurantName from '../RestaurantName';
const ResponsiveContainer = styled(Container)`
  width: 100%;
  @media (min-width: 992px) {  // This is for 'lg' breakpoint
    max-width: 992px;
  }
`;

function ItemsHome() {
    const {auth} = useAuth();
    const [category , setCategory ] = useState(MenuItemType.ALL);
    const id = auth.id;
    useEffect( () => {}, [category])
   
  return (
    <ResponsiveContainer className= "mt-2 p-0 p-md-2">
      <RestaurantName/>
      <Row>
        <Col className="col-12 col-lg-4">
          <div className="shadow-lg inner-columns rounded">
            <AddItemForm managerId={id}/>
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

export default ItemsHome;