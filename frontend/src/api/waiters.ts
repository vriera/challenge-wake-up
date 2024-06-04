
import { Paginated } from "../models/paginated";
import { Waiter } from "../models/waiter";
import { api } from "./api";

export type AddWaiterParams = {
    managerId: number
    name: string
}
export async function addWaiter( {managerId , name} : AddWaiterParams){
    const res = await api.post(`/manager/${managerId}/waiter` , {name})
    
    return res;

}

export type GetWaitersParams = {
    id: number,
    page?: number
}

export async function getWaiters({id, page} : GetWaitersParams) : Promise<Paginated<Waiter>> {
    const res = await api.get(`/manager/${id}/waiter?page=${page??0}`);
    return res.data

}


export type InfiniteWaiterResponse ={
    
    currentPage: number,
    nextPage: number | null,
    data: Waiter[]

}

export function getQueryFnGetWaiter({ id } : { id:number}) 
: ({pageParam} : {pageParam:number}) => Promise<InfiniteWaiterResponse> {
    console.log("gen-query" , id );

    return async ({pageParam} : {pageParam:number}) => {
        const res = await getWaiters({id , page: pageParam})
        let data = res.result as Waiter[];
        let nextPage = pageParam + 1 > res.last_page ?  null : pageParam + 1;
    
        return {data: data , currentPage: pageParam , nextPage:nextPage}
    }
}

export async function refreshToken({ managerId, waiterId } : { managerId:number, waiterId:number}) {
    await api.patch(`/manager/${managerId}/waiter/${waiterId}`)

}