import { OrderItem } from "../context/OrderProvider"
import { Order, OrderItemResponse } from "../models/order"
import { Paginated } from "../models/paginated"
import { api } from "./api"


export type MakeOrderParams = {
    items: OrderItem[]
}


export async function makeOrder({items}: MakeOrderParams){
    let mappedItems = items.map( x => {return {itemId: x.id , amount: x.amount}} )
    return await api.post('/order' , {items:mappedItems});
}
export async function getOrder(orderId: number) : Promise<Order>{
    const res = await api.get(`/order/${orderId}`)
    return res.data
}

export async function getOrders(id: number , isManager:boolean , page:number) : Promise<Paginated<Order>>{

    let url = `/order?page=${page}`;

    if(isManager){
        url = url.concat(`&managerId=${id}`)
    }else{
        url = url.concat(`&waiterId=${id}`)

    }
    const res = await api.get(url)
    return res.data
}

export type InfiniteOrderResponse ={
    
    currentPage: number,
    nextPage: number | null,
    data: Order[]
}
export function getQueryFnGetOrdersInfinite({ id , isManager} : { id:number , isManager:boolean}) 
: ({pageParam} : {pageParam:number}) => Promise<InfiniteOrderResponse> {

    return async ({pageParam} : {pageParam:number}) => {
        const res = await getOrders(id , isManager , pageParam)
        let data = res.result as Order[];
        let nextPage = pageParam + 1 > res.last_page ?  null : pageParam + 1;
    
        return {data: data , currentPage: pageParam , nextPage:nextPage}
    }
}