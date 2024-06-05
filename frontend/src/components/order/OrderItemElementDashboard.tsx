import { useEffect, useState } from "react";
import { OrderItem } from "../../context/OrderProvider";
import { MenuItem } from "../../models/menuItem";
import { getItem } from "../../api/menu";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import useOrder from "../../hooks/userOrder";
import { useQuery } from "@tanstack/react-query";
import { OrderItemResponse } from "../../models/order";

export const OrderItemElementDashboard = ({ orderItem, managerId }: { orderItem: OrderItemResponse, managerId: number }) => {

    const item = orderItem.menuItem;

    return <>
       
            <Row >
                <Col className="col-1">{orderItem.itemCount}</Col>
                <Col >{item.name}</Col>
                <Col className="col-2">{item.price} $</Col>
                <Col className="col-3">{item.price * orderItem.itemCount} $</Col>
            </Row>
        
    </>
}