import { MenuItem } from "../../models/menuItem";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import PlaceholderImage from "../../assets/images/placeholder.png";
import Trash from "../../assets/images/trash.webp"
import {removeItem} from "../../api/menu"
import {useState} from "react"
import "./item.css"
import { useQueryClient } from "@tanstack/react-query";
const MenuItemCard = ({ item , isManager , managerId }: { item: MenuItem , isManager?: boolean , managerId?: number}) => {
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
                    <Col className="p-1 d-flex flex-column flex-grow-1 p-r-1" >
                        <Row className="justify-content-between">
                            <Col className="col-8">
                                <Card.Title>{item.name}</Card.Title>
                            </Col>
                            <Col className="col-2 p-0 align-content-right m-r-min">
                                <Button variant="danger p-0 " onClick={onDeleteItem}  disabled={loading} ><img src={Trash} className="p-0 m-0 trash-icon "/></Button>
                            </Col>
                        </Row>
                        <Row className="flex-grow-1">
                            <Col>
                            </Col>
                        </Row>
                        <Row className="p-0 align-items-en mt-auto " >
                            <Col className="col-8 p">
                                <Card.Text className="description-container">
                                    {item.description} asdfasdfasdfasdfasfddafasdfadsfasd asdfa
                                </Card.Text>
                            </Col>
                            <Col className="col-3 d-flex flex-column justify-content-end align-items-end p-0 h-100">
                                <div>
                                    {item.price} $
                                </div>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    </>


}

export default MenuItemCard;