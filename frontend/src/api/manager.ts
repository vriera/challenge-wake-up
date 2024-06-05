import { api } from "./api";


export async function getManager(managerId:number){
    return await api.get('/manager/' + managerId);
}