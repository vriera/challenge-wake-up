import { MenuItem } from "../models/menuItem";
import { MenuItemType } from "../models/menuItemType";
import { loginManager } from "../api/auth";
import { api } from "./api";




export type InfiniteItemResponse ={
    
        currentPage: number,
        nextPage: number | null,
        data: MenuItem[]
    
}

export async function getItemsInfinite({pageParam } : {pageParam:number }): 
Promise<InfiniteItemResponse>{
    const res = await getItems({managerId: 2 , page: pageParam})
    let data = res.result as MenuItem[];
    let nextPage = pageParam + 1 > res.last_page ?  null : pageParam + 1;

    return {data: data , currentPage: pageParam , nextPage:nextPage}
} 

export function getQueryFnGetItemsInfinite({ id , category} : { id:number , category?:MenuItemType}) 
: ({pageParam} : {pageParam:number}) => Promise<InfiniteItemResponse> {
    console.log("gen-query" , id , category);

    return async ({pageParam} : {pageParam:number}) => {
        const res = await getItems({managerId: id , category:category , page: pageParam})
        let data = res.result as MenuItem[];
        let nextPage = pageParam + 1 > res.last_page ?  null : pageParam + 1;
    
        return {data: data , currentPage: pageParam , nextPage:nextPage}
    }
}

export async function getItems( p : {managerId:number , page?:number , category?: MenuItemType}) {
    let page = p.page ?? 0;
    let url = `/menu/${p.managerId}?page=${page}`;
    console.log("getting items" )
    if(p.category && p.category !== MenuItemType.ALL)
        url=url.concat(`&filter=${p.category}`)
    console.log(url)
    const res = await api.get(url);
    console.log(res);
    return res.data;
}
export type AddItemParams = {
    name: string,
    description: string,
    price: number,
    type: MenuItemType
}

export async function addItem(p: AddItemParams , managerId:number){
    const res = await api.post(`/menu/${managerId}` , p);
    return res.data;
}

export async function getItem(itemId: number , managerId:number){
    const res = await api.get(`/menu/${managerId}/item/${itemId}`);
    return res.data;
}



export async function removeItem(itemId: number , managerId:number){
    const res = await api.delete(`/menu/${managerId}/item/${itemId}`);
    return res.data;
}