import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import PlaceHolder from "react-bootstrap/Placeholder"
import PlaceholderImage from "../../assets/images/placeholder.png";
import { MenuItem } from "../../models/menuItem";

const MenuItemCardPlaceholer = () => {


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
                                    <PlaceHolder as={Card.Title} animation="glow"> 
                                        <PlaceHolder xs={6} />
                                    </PlaceHolder>
                            </Col>
                        </Row>
                        <Row className="flex-grow-1">
                            <Col>
                            </Col>
                        </Row>
                        <Row className="p-0 align-items-en mt-auto " >
                            <Col className="col-8 p">
                                    <PlaceHolder as={Card.Text} animation="glow">
                                        <PlaceHolder xs={7} /> <PlaceHolder xs={4} /> <PlaceHolder xs={4} />{' '}
                                        <PlaceHolder xs={6} /> <PlaceHolder xs={8} />
                                    </PlaceHolder>
                            </Col>
                            <Col className="col-3 d-flex flex-column justify-content-end align-items-end p-0 h-100">
                                 
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Card.Body>
        </Card>
            </>


}


/*
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
*/
export default MenuItemCardPlaceholer;