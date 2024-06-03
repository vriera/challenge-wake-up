import { MenuItemType } from "./menuItemType";

export type MenuItem = {
    id: number;
    name: string;
    description: string;
    price:number;
    type: MenuItemType
}