import { ArrayNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { OrderItemDto } from "./order-item.dto";
import { Type } from "class-transformer";

export class OrderDto{
    @IsOptional()
    @IsString({ message: "Description must be a string." })
    description: string;

    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    @ArrayNotEmpty({ message: "There must be at least one item in the order." })
    items: OrderItemDto[];

}