
import Container from "react-bootstrap/Container";
import useOrder from "../../hooks/userOrder";
import styled from 'styled-components';
import { useEffect, useState } from "react";
import { OrderItemElement } from "./OrderItemElement";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "./item.css"
import { Button } from "react-bootstrap";
import { getOrder } from "../../api/order";
import { OrderItem } from "../../context/OrderProvider";
import { useQuery } from "@tanstack/react-query"
import { Order } from "../../models/order";
import { OrderItemElementDashboard } from "./OrderItemElementDashboard";

import { format, formatDate } from 'date-fns';
const ResponsiveContainer = styled(Container)`
  width: 100%;
  @media (min-width: 1200px) {  // This is for 'lg' breakpoint
    max-width: 1200px;
  }
`;

const convertDateString = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy, HH:mm:ss');
};


const OrderSummaryDashboard = ({ orderId, managerId }: { orderId: number, managerId: number }) => {


    const { data: order, isLoading } = useQuery<Order>({
        queryKey: ['order', orderId],
        queryFn: () => getOrder(orderId),
    });


    return <>{order && <><ResponsiveContainer className="text-white mb-1 rounded shadow-lg small-font bg-secondary">

        <h3 className="text-white pt-2">Order #{order.id} - by : {order.waiter.name}</h3>
        <hr className="mt-1"></hr>
        <Row >
            <Col className="col-1">Qty</Col>
            <Col>Name</Col>
            <Col className="col-2">Price</Col>
            <Col className="col-3">Total</Col>
        </Row>
        {order && order.items && order.items.map((item) => {
            return <>
                <hr></hr><OrderItemElementDashboard key={item.id} orderItem={item} managerId={managerId} />
            </>
        })}
        <hr className="mb-2"></hr>
        <Row className="pb-2">
            <Col className="align-items-center"><div className="m-1">Total: ${order && order.items && order.items.reduce((acum, item) => {
                return item.menuItem.price * item.itemCount
            }
                , 0)}</div></Col>
        </Row>
        <Row className="pb-2">
            <Col className="align-items-center"><div className="m-1"> {convertDateString(order.created_at) }</div></Col>
        </Row>
    </ResponsiveContainer>
    </>
    }
    </>
}

export default OrderSummaryDashboard;

