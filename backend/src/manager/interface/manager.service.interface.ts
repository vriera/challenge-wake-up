import { ManagerDTO } from "../dto/manager.dto";




export interface IManagerService {
   findByUsername(username: string): Promise<ManagerDTO | undefined>;
   findById(id:number): Promise<ManagerDTO | undefined>
}