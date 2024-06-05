
import Container from "react-bootstrap/Container";
import useOrder from "../../hooks/userOrder";
import styled from 'styled-components';
import { useEffect, useState} from "react";
import { useInView } from "react-intersection-observer";

import { OrderItemElement } from "./OrderItemElement";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import "./item.css"
import OrderSummaryDashboard from "./OrderSummaryDashboard";
import useAuth from "../../hooks/useAuth";
import RestaurantName from "../RestaurantName";
import { useInfiniteQuery } from "@tanstack/react-query";
import { InfiniteOrderResponse, getQueryFnGetOrdersInfinite } from "../../api/order";
import { UserTypes } from "../../models/userTypes";
const ResponsiveContainer = styled(Container)`
  width: 100%;
  @media (min-width: 1200px) {  // This is for 'lg' breakpoint
    max-width: 1200px;
  }
`;

const OrderDashboard = () => {
    const { ref, inView } = useInView();

    const { auth } = useAuth()
    const { data, error, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['orders' , auth.role , auth.id],
        queryFn: getQueryFnGetOrdersInfinite({id: auth.id , isManager: auth.role === UserTypes.MANAGER}),
        initialPageParam: 0,
        getNextPageParam: (lastPage: InfiniteOrderResponse, allPages, lastPageParam) => lastPage.nextPage,
    })
    useEffect(
        () => {
            if (inView) {
                fetchNextPage();
            }
        }
        , [fetchNextPage, inView]);
    return <>
        
        { status === "error" && <div>{error.message}</div> }
        {status !== "pending" && status !== "error" &&  <div>
                <ResponsiveContainer className="me-auto pb-2 pt-1 p-0 p-md-2 p-r-0" >
                    <RestaurantName></RestaurantName>
                    <Row className="justify-content-center mb-1">
                        <Col >
                            <Card className="text-center ">
                                <Card.Body>
                                    <Card.Title className="text-white">
                                        <h1>Orders:</h1>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    { !data || data.pages.every(page => page.data.length === 0) && <>
                    <Card className="m-3 shadow-lg">
                        <Card.Body>
                                    <Card.Title>No orders </Card.Title>
                        </Card.Body>
                    </Card>
                 </>}
                    {data.pages.map((page) => {

                        return <div key={page.currentPage}>
                            {
                                page.data.map((item) => {
                                    return <OrderSummaryDashboard managerId={auth.restaurantId} orderId={item.id}></OrderSummaryDashboard>

                                })
                            }

                        </div>

                    })
                }
            <div ref={ref}></div>

        </ResponsiveContainer>
            </div>
        }
    </>
}

export default OrderDashboard;

