import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import Row from "react-bootstrap/Row";
import InfiniteMenu from '../InfiniteMenu';
import CategorySelector from '../selector/CategorySelector';
import "./columns.css";
import { useNavigate, useParams } from 'react-router-dom';
import AddItemForm from './AddItemForm';
import { MenuItemType } from '../../models/menuItemType';
import useAuth from '../../hooks/useAuth';


function ItemsHome() {
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
    <Container className= "mt-2">
      <Row>
        <Col className="col-12 col-lg-4">
          <div className="shadow-lg inner-columns rounded">
            <AddItemForm/>
          </div>
        </Col>
        <Col className="col-12 col-lg-8">
          <div className="shadow-lg inner-columns rounded">
            <CategorySelector onSelectCategory={setCategory}/>
            <InfiniteMenu id={auth.restaurantId} category={category}/>
          </div>
        </Col>
      </Row>
    </Container>
    
  );  
}

export default ItemsHome;