
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import Card from "react-bootstrap/Card"
import { InfiniteWaiterResponse, getQueryFnGetWaiter } from "../../../api/waiters";
import useAuth from "../../../hooks/useAuth";
import WaiterCard from "./WaiterCard";
import WaiterCardPlaceholder from "./WaiterCardPlaceholder";
const ResponsiveContainer = styled(Container)`
width: 100%;
@media (min-width: 992px) {  // This is for 'lg' breakpoint
  max-width: 992px;
}
`;

export type WaitersParams = {
    id:number,
}


const Waiters : React.FC<WaitersParams> = ({id})  => {
  
    const {auth} = useAuth();
    const { ref, inView } = useInView();

    const { data, error, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['waiters' , id],
        queryFn: getQueryFnGetWaiter({id}) ,
        initialPageParam: 0,
        getNextPageParam: (lastPage: InfiniteWaiterResponse, allPages, lastPageParam) => lastPage.nextPage,


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
        <ResponsiveContainer className="pb-2 p-0 p-md-2 p-r-0" > 
             <h2 className="align-content-center text-white">Waiters: </h2>
             <hr></hr>
            {Array.from({ length: 4 }, (_, index) => (<WaiterCardPlaceholder/>))}
           </ResponsiveContainer  >
        }
        { status === "error" && <div>{error.message}</div> }
        {status !== "pending" && status !== "error" &&
            <div>

                <ResponsiveContainer className="pb-2 p-0 p-md-2 p-r-0" >
                    <h2 className="align-content-center text-white">Waiters: </h2>
                    <hr></hr>
                    { !data || data.pages.every(page => page.data.length === 0) && <>
                    <Card className="m-3 shadow-lg">
                        <Card.Body>
                                    <Card.Title>No items </Card.Title>
                                    <Card.Text>
                                        There are no waiters registered
                                    </Card.Text>
                        </Card.Body>
                    </Card>
                 </>}
                    {data.pages.map((page) => {

                        return <div key={page.currentPage}>
                            {
                                page.data.map((waiter) => {
                                    return <>
                                            <WaiterCard waiter={waiter} managerId={id}/>
                                        </>


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

export default Waiters;



