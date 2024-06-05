import Container from "react-bootstrap/Container";
import useOrder from "../../hooks/userOrder";
import styled from 'styled-components';
import { useEffect, useState } from "react";
import { OrderItemElement } from "./OrderItemElement";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "./item.css"
import { Button } from "react-bootstrap";
import { makeOrder } from "../../api/order";

const ResponsiveContainer = styled(Container)`
  width: 100%;
  @media (min-width: 1200px) {  // This is for 'lg' breakpoint
    max-width: 1200px;
  }
`;



const OrderSummary = ({ waiterId, managerId }: { waiterId: number, managerId: number }) => {
    const { finishOrder, orderItems } = useOrder()
    const [total, setTotal] = useState(0)
    const [submitting , setSubmitting] = useState(false)
    const onOrderFinish = async (event:any) => {
        event.preventDefault()
        setSubmitting(true)
        try{
            await makeOrder({items: orderItems});
            finishOrder()
        }catch(e){
            console.log("error with order")
        }
        setSubmitting(false)
    }

    return <ResponsiveContainer className="text-white mb-1 small-font">
        <h3 className="text-white pt-2">Order Summary</h3>
        <hr className="mt-1"></hr>
        <Row >
            <Col className="col-1 ">Qty</Col>
            <Col>Name</Col>
            <Col className="col-2">Price</Col>
            <Col className="col-3">Total</Col>
        </Row>
        {orderItems.map((item) => {
            return <>
                <hr></hr><OrderItemElement key={item.id} orderItem={item} managerId={managerId} />
            </>
        })}
        <hr className="mb-2"></hr>
        <Row className="pb-2">
            <Col className="align-items-center"><div className="m-1">Total: {orderItems.reduce((acum, item) => {
                if (item.price)
                    return acum + item.price * item.amount
                return acum
            }
                , 0)}$</div></Col>
            <Col className=" d-flex flex-column justify-content-end align-items-end"><Button className="small-font" onClick={onOrderFinish} disabled={orderItems?.length <= 0 || submitting}>Finish Order</Button></Col>
        </Row>
    </ResponsiveContainer>

}

export default OrderSummary;