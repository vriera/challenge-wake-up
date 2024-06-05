import { Button } from "react-bootstrap"
import { OrderContext } from "../../context/OrderProvider"
import useOrder from "../../hooks/userOrder"
import { MenuItem } from "../../models/menuItem"


export type MenuItemOrderHandlerParams = {
    item: MenuItem

}

const MenuItemOrderHandler: React.FC<MenuItemOrderHandlerParams> = ({ item }) => {
    const { getItemCount, addOneItem, decreaseOneItem, removeFromOrder  } = useOrder();
    const id = item.id
    const quantity = getItemCount(id)
    
    return <>
            <div className="d-flex align-items-center justify-content-center border border-1 bg-primary rounded p-0 order-count-container w-100">
            {quantity === 0 && <Button className="w-100 small p-1" onClick={() => addOneItem(id)}> + </Button>}
            {quantity !== 0 &&
                <>
                    <Button className="small p-1" onClick={() => decreaseOneItem(id)}> - </Button>
                    <div className="flex-grow-1 order-amount d-flex align-items-center justify-content-center">
                        {quantity}
                    </div>
                    <Button className="small p-1" onClick={() => addOneItem(id)}> + </Button>
                </>
            }
            </div>
         
        </>
        }

export default MenuItemOrderHandler