import { Injectable } from '@nestjs/common';
import { ManagerDTO } from './dto/manager.dto';
import { IManagerService } from './interface/manager.service.interface';

@Injectable()
export class ManagerService implements IManagerService {


    private readonly managers= [ {
            userId: 1,
            username: "val",
            password: "123123"
        },
        {
            userId: 2,
            username: "notVal",
            password: "321321"
        }
    ]


    async findByUsername(username: string): Promise<ManagerDTO | undefined> {
     return this.managers.find(x => x.username === username);
    }

    async findById(id:number): Promise<ManagerDTO | undefined> {
        return this.managers.find(x => x.userId === id);
    }
}
