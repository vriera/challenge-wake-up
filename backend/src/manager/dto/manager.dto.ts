import { IsDefined, IsNotEmpty } from "class-validator"

export class ManagerDTO{
    
    @IsDefined()
    @IsNotEmpty()
    username: string;
    
    @IsDefined()
    @IsNotEmpty()
    password: string;

    @IsDefined()
    @IsNotEmpty()
    email:string;

    @IsDefined()
    @IsNotEmpty()
    restaurant:string;
}