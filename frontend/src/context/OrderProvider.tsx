import { ReactNode, createContext, useState } from "react";

export const OrderContext = createContext<OrderContextType>({
  } as OrderContextType);

export type OrderContextType = {
    totalItems: number;
    orderItems: OrderItem[];
    finishOrder : () => void;
    getItemCount : (id:number) => number;
    addOneItem : (id:number) => void;
    decreaseOneItem : (id:number) => void;
    removeFromOrder : (id : number) => void;
    addPrice: (id:number, price:number) => void;
}
export type OrderItem = {
    id: number
    amount: number
    price?: number
}
const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [orderItems , setOrderItems] = useState<OrderItem[]>([]);
    function getItemCount(id:number){
        return orderItems.find(x => x.id === id)?.amount || 0
    }
    function addPrice(id:number , price:number){
        setOrderItems( (items) => {
                return items.map( (item) => {
                    if(item.id === id)
                        return {...item , price}
                    else
                        return item
                })
            })
    }
    function addOneItem(id:number){
        setOrderItems( (items) => {
            if(!items.find( x => x.id === id) ){
                return [...items , {id, amount:1} ]
            }else{
                return items.map((item) => {
                    if(item.id === id){
                        return { ...item , amount: item.amount + 1}
                    }else{
                        return item;
                    }
                })
            }
        })
    }

    function decreaseOneItem(id:number){
        setOrderItems( (items) => {
            if(items.find(x => x.id === id)?.amount === 1){
                return items.filter(x=> x.id !== id)
            }else{
                return items.map((item) => {
                    if(item.id === id){
                        return { ...item , amount: item.amount - 1}
                    }else{
                        return item;
                    }
                })
            }
        })
    }

    const totalItems = orderItems.reduce( (acum , item) => item.amount + acum , 0)

    function removeFromOrder(id:number){
        setOrderItems( (items) => {
           return items.filter(x=> x.id !== id)
        })
    }

    function finishOrder(){
        setOrderItems((items) => { return [] })
    }
    return (<OrderContext.Provider value={{getItemCount , addOneItem , decreaseOneItem , removeFromOrder , finishOrder, orderItems , totalItems , addPrice}}>
        {children}
    </OrderContext.Provider>
    )
}

export default OrderProvider;