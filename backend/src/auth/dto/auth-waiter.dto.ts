import { IsDefined, IsNotEmpty } from "class-validator"


export class AuthWaiterDto {
    @IsDefined()
    @IsNotEmpty()
    restaurant: string;

    @IsDefined()
    @IsNotEmpty()
    token: string;
}