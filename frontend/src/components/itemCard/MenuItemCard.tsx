import {useState} from "react"
import { useQueryClient } from "@tanstack/react-query";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import PlaceholderImage from "../../assets/images/placeholder.png";

import "./item.css"

import { MenuItem } from "../../models/menuItem";
import Trash from "../../assets/images/trash.webp"
import {removeItem} from "../../api/menu"
import MenuItemOrderHandler from "./MenuItemOrderHandler";

const MenuItemCard = ({ item , isManager , managerId , isWaiter}: { item: MenuItem , isManager?: boolean , managerId?: number , isWaiter?: boolean}) => {
    const queryClient = useQueryClient();
    const [loading , setLoading] = useState(false);
    const onDeleteItem = async () => {
      
        if(!isManager)
            return;
        if(!managerId)
            return;
        setLoading(true);
        const userResponse = window.confirm("Are you sure you want to delete this item?");
        if(!userResponse)
            return;
        try{
            await removeItem( item.id , managerId);
            queryClient.invalidateQueries( {
                predicate: (query) =>
                  query.queryKey[0] === 'menuItems' && query.queryKey[1] === managerId,
              })
        }catch(e){
            alert("error");
        }
        setLoading(false);
    };
    return <>
        <Card className="shadow-lg m-lg-3 m-md-2 m-0 mt-0 mb-1 p-0">
            <Card.Body className="p-0 p-md-1 p-lg-2 custom-card-body">
                <Row className="justify-content-center p-0 p-md-1">
                    <Col className="col-4 col-md-4 col-lg-4 p-r-0">
                        <Card.Img src={PlaceholderImage}  />
                    </Col>
                    <Col className="p-1 d-flex flex-column flex-grow-1 me-1 me-lg-0" >
                        <Row className="justify-content-between">
                            <Col className="col-8">
                                <Card.Title>{item.name}</Card.Title>
                            </Col>
                            <Col className="col-2 p-0 align-content-right me-2 me-md-1">
                                {isManager && <Button variant="danger p-0 " onClick={onDeleteItem}  disabled={loading} ><img src={Trash} className="p-0 m-0 trash-icon "/></Button> }
                            </Col>
                        </Row>
                        <Row className="flex-grow-1">
                            <Col>
                            </Col>
                        </Row>
                        <Row className="p-0 align-items-en mt-auto " >
                            <Col className="col-8 p">
                                <Card.Text className="description-container">
                                    {item.description}
                                </Card.Text>
                            </Col>
                            <Col className="col-3  d-flex flex-column justify-content-end align-items-end p-0 h-100">
                                <h6>
                                    {item.price} $
                                </h6>
                                
                                { isWaiter && <MenuItemOrderHandler item={item}></MenuItemOrderHandler> }
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    </>


}

export default MenuItemCard;