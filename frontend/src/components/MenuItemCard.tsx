import { MenuItem } from "../models/menuItem";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import PlaceholderImage from "../assets/images/placeholder.png";

const MenuItemCard = ({ item }: { item: MenuItem }) => {

    return <>
                    <Card className="m-3 shadow-lg">
                        <Card.Body>
                            <Row className="justify-content-md-center">

                                <Col xs lg="2">
                                    <Card.Img  src={PlaceholderImage} />
                                </Col>
                                <Col className="align-content-lg-end">

                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        {item.description}
                                    </Card.Text>

                                </Col>
                                <Col md="auto">Variable width content</Col>
                                <Col xs  className="jus">
                                    <Button variant="primary">{item.price}</Button>

                                </Col>
                            </Row>

                        </Card.Body>
                    </Card>
            </>


}

export default MenuItemCard;