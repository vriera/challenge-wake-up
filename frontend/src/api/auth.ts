import { jwtDecode } from "jwt-decode";
import { api } from "./api";
import { UserTypes } from "../models/userTypes";
import { JWTPayload } from "../models/jwtPayload";


export async function loginManager(managerCredentials: {username:string , password:string}){
    console.log("loggin in, manager")
    const res = await api.post(
        "/auth/login/manager",
        managerCredentials
    )
    console.log(res)
    return res;
}

export type RegisterManagerParams = {
    username:string,
    password:string,
    email:string,
    restaurant:string
}


export async function registerManager( p : RegisterManagerParams){
    return await api.post('/manager' , p);
}

export async function loginWaiter(waiterCredentials: {restaurant:string , token:string}){
    console.log("loggin in, waiter")
    const res = await api.post(
        "/auth/login/waiter",
        waiterCredentials
    )
    console.log(res)
    return res;
}

