
import { useInfiniteQuery } from "@tanstack/react-query";
import { getItemsInfinite, getQueryFnGetItemsInfinite } from "../../api/menu";
import { InfiniteItemResponse } from "../../api/menu";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import MenuItemCard from "./MenuItemCard";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import MenuItemCardPlaceholer from "./MenuItemCardPlaceholder";
import { MenuItemType } from "../../models/menuItemType";
import Card from "react-bootstrap/Card"
import useAuth from "../../hooks/useAuth";
import { UserTypes } from "../../models/userTypes";
const ResponsiveContainer = styled(Container)`
width: 100%;
@media (min-width: 992px) {  // This is for 'lg' breakpoint
  max-width: 992px;
}
`;

export type InfiniteMenuParams = {
    id:number,
    category: MenuItemType
}


const InfiniteMenu : React.FC<InfiniteMenuParams> = ({id,category})  => {
  
    const {auth} = useAuth();
    const { ref, inView } = useInView();
    
    const { data, error, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['menuItems' , id , category],
        queryFn: getQueryFnGetItemsInfinite({id,category}),
        initialPageParam: 0,
        getNextPageParam: (lastPage: InfiniteItemResponse, allPages, lastPageParam) => lastPage.nextPage,


    })
    useEffect(
        () => {
            if (inView) {
                fetchNextPage();
            }
        }
        , [fetchNextPage, inView]);
        
    return    <>
     { status === "pending" && 
        <ResponsiveContainer  className="pb-2 pt-1 p-0 p-md-2 p-r-0"  > 

            {Array.from({ length: 10 }, (_, index) => (
                <MenuItemCardPlaceholer></MenuItemCardPlaceholer>
            ))
            }
           </ResponsiveContainer  >
        }
        { status === "error" && <div>{error.message}</div> }
        {status !== "pending" && status !== "error" &&
            <div>

                <ResponsiveContainer className="pb-2 pt-1 p-0 p-md-2 p-r-0" >
                    { !data || data.pages.every(page => page.data.length === 0) && <>
                    <Card className="m-3 shadow-lg">
                        <Card.Body>
                                    <Card.Title>No items </Card.Title>
                                    <Card.Text>
                                        There are no items of this type
                                    </Card.Text>
                        </Card.Body>
                    </Card>
                 </>}
                    {data.pages.map((page) => {

                        return <div key={page.currentPage}>
                            {
                                page.data.map((item) => {
                                    return <MenuItemCard item={item} isManager={auth.role === UserTypes.MANAGER} isWaiter={auth.role === UserTypes.WAITER} managerId={auth.id}  ></MenuItemCard>

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

export default InfiniteMenu;



