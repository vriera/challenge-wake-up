import { IsDefined, IsNotEmpty, IsNumber, IsPositive, Min } from "class-validator"

export class OrderItemDto{
    
    @IsNotEmpty({ message: "Item ID must be provided." })
    itemId: number;

    @IsNotEmpty({ message: "Amount must be provided." })
    @Min(1, { message: "Amount must be at least 1." })
    @IsNumber({maxDecimalPlaces: 0}, { message: "Amount must be an integer." })
    @IsPositive({ message: "Amount must be greater than 0." })
    amount: number;
    
    

}