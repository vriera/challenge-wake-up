import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import PlaceholderImage from "../../../assets/images/waiter.png";
import Refresh from "../../../assets/images/refresh.webp";
import { useState } from "react"

import { useQueryClient } from "@tanstack/react-query";
import { Waiter } from "../../../models/waiter";
import "./item.css"
import Button from "react-bootstrap/Button"
import { refreshToken } from "../../../api/waiters";




const WaiterCard = ({ waiter , managerId}: { waiter: Waiter ,managerId:number}) => {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const onRefreshToken = async () => {

        console.log("new token!")
        await refreshToken({managerId, waiterId: waiter.id})
        queryClient.invalidateQueries( {
            predicate: (query) =>
              query.queryKey[0] === 'waiters' && query.queryKey[1] === managerId,
          })    
        
        }
    // const onDeleteItem = async () => {

    //     if(!isManager)
    //         return;
    //     if(!managerId)
    //         return;
    //     setLoading(true);
    //     const userResponse = window.confirm("Are you sure you want to delete this item?");
    //     if(!userResponse)
    //         return;
    //     try{
    //         await removeItem( item.id , managerId);
    //         queryClient.invalidateQueries( {
    //             predicate: (query) =>
    //               query.queryKey[0] === 'menuItems' && query.queryKey[1] === managerId,
    //           })
    //     }catch(e){
    //         alert("error");
    //     }
    //     setLoading(false);
    // };

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
                                <Card.Title>Name: {waiter.name}</Card.Title>
                            </Col>
                        </Row>
                        <Row className="flex-grow-1">
                            <Col>
                            </Col>
                        </Row>
                        <Row className="p-0 align-items-end mt-auto " >
                            <Col className="col-8 p">
                                <Card.Text className="description-container">
                                    <Button variant="warning" className="p-0 m-1" onClick={onRefreshToken} disabled={loading} ><img src={Refresh} className=" p-0 m-0 icon" /></Button>
                                    <span className="bold">Token: </span>{waiter.token}
                                </Card.Text>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    </>


}

export default WaiterCard;