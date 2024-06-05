import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Waiter } from './entity/waiter.entity';
import { Repository } from 'typeorm';
import * as constants from '../constants';

import { WaiterDto } from './dto/waiter.dto';
import { Manager } from '../manager/entity/manager.entity';
import { Paginated } from 'src/commons/pagination.interface';

@Injectable()
export class WaiterService {


    constructor  ( @Inject(constants.WAITER_REPOSITORY) private waiterRepository: Repository<Waiter>){}

    async addWaiter( dto: WaiterDto) : Promise<Waiter>{

        const waiter = new Waiter();
        waiter.manager = {id: dto.managerId} as Manager;
        waiter.name = dto.name;
        waiter.token = dto.token;

        return await this.waiterRepository.save(waiter);

    }

    async updateToken( id: number , token:string) : Promise<Waiter>{
        const waiter = await this.waiterRepository.findOne({where: {id}});
        if(!waiter)
            throw new NotFoundException('Waiter not found');

        waiter.token = token;
        
        return await this.waiterRepository.save(waiter);
    }
  
    async getWaiters(managerId: number, pageNumber: number) : Promise<Paginated<Waiter>>{
        const manager = { id: managerId} as Manager;
        const take = constants.PAGE_DEFAULT_SIZE;
        const skip = pageNumber * take;
        const [result , total ] = await this.waiterRepository.findAndCount( {
            where: {manager: manager},
            order: {id: "DESC"},
            take,
            skip
        })
        return new Paginated<Waiter>(result,total,take);
    }

    async findWaiterByToken(managerId: number, token: string) : Promise<Waiter>{
        const manager =  {id: managerId} as Manager;
        return await this.waiterRepository.findOne({where: {token:token , manager:manager } ,relations: ["manager"]} );
    }

    async getWaiter(waiterId: number) : Promise<Waiter>{
       return this.waiterRepository.findOne({where: {id:waiterId } ,relations: ["manager"]} );
    }
}
