import { useEffect, useState } from "react";
import { OrderItem } from "../../context/OrderProvider";
import { MenuItem } from "../../models/menuItem";
import { getItem } from "../../api/menu";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import useOrder from "../../hooks/userOrder";
import { useQuery } from "@tanstack/react-query";

export const OrderItemElement = ({ orderItem, managerId }: { orderItem: OrderItem, managerId: number }) => {

    const {addPrice} = useOrder();
    const { data: item, isLoading } = useQuery({
        queryKey: ['item', orderItem.id],
        queryFn: () => fetchItem(orderItem.id , managerId),
      });

      const fetchItem = async (itemId : number , managerId: number) => {
        const res : MenuItem= await getItem(itemId, managerId)
        addPrice(res.id , res.price);
        return res;
      };
      
    


    return <>
        {!isLoading && item &&
            <Row >
                <Col className="col-1">{orderItem.amount}</Col>
                <Col >{item.name}</Col>
                <Col className="col-2">{item.price} $</Col>
                <Col className="col-3">{item.price * orderItem.amount} $</Col>
            </Row>
        }
    </>
}