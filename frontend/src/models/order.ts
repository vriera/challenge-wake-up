import { OrderItem } from "../context/OrderProvider"
import { MenuItem } from "./menuItem"
import { Waiter } from "./waiter"

export type OrderItemResponse = {
    id: number,
    itemCount: number,
    orderId:number,
    menuItem: MenuItem
}
export type Order = {
    id: number,
    description?: string,
    created_at: string,
    waiter: Waiter,
    items: OrderItemResponse[]
}