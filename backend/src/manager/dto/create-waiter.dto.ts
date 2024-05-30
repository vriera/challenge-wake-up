import { IsDefined, IsNotEmpty } from "class-validator"

export class CreateWaiterDTO{
    
    @IsDefined()
    @IsNotEmpty()
    name: string;
    
}