
import Row  from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Placeholder from "react-bootstrap/Placeholder";
import {getManager} from '../api/manager';
import {useState , useEffect} from "react"
import useAuth from "../hooks/useAuth";
import "./style.css"
import { useQuery } from "@tanstack/react-query";


const fetchRestaurant = async (restaurantId : number) => {
  const res = await getManager(restaurantId);
  return res.data.restaurant;
};

const RestaurantName = () => {

    const {auth} = useAuth();
    const { data: restaurant, isLoading } = useQuery({
      queryKey: ['restaurant', auth.restaurantId],
      queryFn: () => fetchRestaurant(auth.restaurantId),
      enabled: !!auth.restaurantId, // only run the query if restaurantId is available
    }
    );
   
    return  <Row className="justify-content-center mb-1">
    <Col >
      <Card className="text-center inner-columns ">
        <Card.Body>
          <Card.Title className="text-white">
            {isLoading&& (
              <Placeholder as="h1" animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
            )}
            {! isLoading&& <h1>{restaurant as string}</h1>}
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  </Row>
}

export default RestaurantName;