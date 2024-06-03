import { UserTypes } from "./userTypes";

export interface JWTPayload {
    sub:number,
    restaurantId:number,
    username:string,
    type: UserTypes
}