import { MenuItem } from "../models/menuItem";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import PlaceHolder from "react-bootstrap/Placeholder"
import PlaceholderImage from "../assets/images/placeholder.png";
const MenuItemCardPlaceholer = () => {


    return <>
                    <Card className="m-3">
                        <Card.Body>
                            <Row className="justify-content-md-center">

                                <Col xs lg="2">
                                    <Card.Img  src={PlaceholderImage} />
                                </Col>
                                <Col className="align-content-lg-end">

                                    <PlaceHolder as={Card.Title} animation="glow"> 
                                        <PlaceHolder xs={6} />
                                    </PlaceHolder>
                                    <PlaceHolder as={Card.Text} animation="glow">
                                        <PlaceHolder xs={7} /> <PlaceHolder xs={4} /> <PlaceHolder xs={4} />{' '}
                                        <PlaceHolder xs={6} /> <PlaceHolder xs={8} />
                                    </PlaceHolder>
                                </Col>
                                <Col md="auto">Variable width content</Col>
                                <Col xs  className="jus">
                                    <PlaceHolder.Button variant="primary" xs={6} />
                                </Col>
                            </Row>

                        </Card.Body>
                    </Card>
            </>


}

export default MenuItemCardPlaceholer;