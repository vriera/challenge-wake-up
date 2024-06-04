import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import PlaceHolder from "react-bootstrap/Placeholder"
import PlaceholderImage from "../../../assets/images/waiter.png";
import Refresh from "../../../assets/images/refresh.webp";
import Button from "react-bootstrap/Button"
const WaiterCardPlaceholer = () => {
  

    return <>
        <Card className="shadow-lg m-lg-3 m-md-2 m-0 mt-0 mb-1 p-0">
            <Card.Body className="p-0 p-md-1 p-lg-2 custom-card-body">
                <Row className="justify-content-center p-0 p-md-1">
                    <Col className="col-2 col-md-2 col-lg-2 p-r-0">
                        <Card.Img className="bg-white rounded" src={PlaceholderImage} />
                    </Col>
                    <Col className="p-1 d-flex flex-column flex-grow-1 p-r-1" >
                        <Row className="justify-content-between">
                            
                            <Col className="col-8">
                                    <PlaceHolder as={Card.Title} animation="glow"> 
                                        Name: <PlaceHolder xs={6} />
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
                                    <Button variant="warning" className="p-0 m-1" disabled={true}><img src={Refresh} className=" p-0 m-0 icon" /></Button>Token: <PlaceHolder xs={7} />{' '}
                                    </PlaceHolder>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    </>


}

export default WaiterCardPlaceholer