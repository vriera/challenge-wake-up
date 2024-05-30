import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ManagerDTO } from './dto/manager.dto';
import * as constants from "../constants"
import { QueryFailedError, Repository } from 'typeorm';
import { Manager } from './entity/manager.entity';
import { WaiterService } from '../waiter/waiter.service';
import { Waiter } from '../waiter/entity/waiter.entity';
import { WaiterDto } from 'src/waiter/dto/waiter.dto';
import { CreateWaiterDTO } from './dto/create-waiter.dto';
import {nanoid} from 'nanoid'
import { Paginated } from 'src/commons/pagination.interface';
@Injectable()
export class ManagerService {

    constructor ( @Inject(constants.MANAGER_REPOSITORY) private managerRepository: Repository<Manager> , private waiterService: WaiterService){}
  

    async findByUsername(username: string): Promise<Manager> {
     return this.managerRepository.findOneBy({username:username});
    }

    async findByRestaurant(restaurant: string): Promise<Manager> {
        return this.managerRepository.findOneBy({restaurant:restaurant});
    }

    async findById(id:number): Promise<Manager> {
        return this.managerRepository.findOneBy({id:id});
    }

    async findAll(): Promise<Manager[]>{
        return this.managerRepository.find();
    }

    async add(managerDto: ManagerDTO) : Promise<Manager> {
        const manager = new Manager();
        manager.email = managerDto.email;
        manager.password = managerDto.password;
        manager.restaurant = managerDto.restaurant;
        manager.username = managerDto.username;
        try{
            return await this.managerRepository.save(manager);
        }catch(error){
            //TODO: Better error messages
            throw new BadRequestException(error.message);
        }
    }

    async addWaiter(managerId: number , dto: CreateWaiterDTO): Promise<Waiter> {
        const token = await this.generateToken();
        return this.waiterService.addWaiter({managerId , name: dto.name ,token })   
    }

    async resetToken(waiterId: number): Promise<Waiter> {
        const token = await this.generateToken();
        return this.waiterService.updateToken(waiterId ,token);
    }

    async findWaiters(managerId:number, page:number): Promise<Paginated<Waiter>>{
        return this.waiterService.getWaiters(managerId, page);
    }

    
    async findWaiter(waiterId:number ): Promise<Waiter>{
        const waiter = await this.waiterService.getWaiter(waiterId);
        if(!waiter)
            throw new NotFoundException();
        return waiter;
    }

    async findWaiterByToken(managerId : number , token: string ): Promise<Waiter>{
       return await this.waiterService.findWaiterByToken(managerId,token)
    }

    //Token generation function can be modified in the future.
    private async generateToken(){
        return nanoid(10);
    }
}
