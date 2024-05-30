import { IsOptional, IsNotEmpty, Min, IsNumber, IsPositive, IsEnum } from "class-validator";
import { MenuItemType } from "../enums/menu-item-type.enum";

export class PatchMenuItemDTO {
    
    @IsOptional()
    @IsNotEmpty({ message: "Description cannot be empty." })
    description?: string;

    @IsOptional()
    @Min(0, { message: "Price cannot be negative." })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: "Price must not have more than two decimal places." })
    @IsPositive({ message: "Price must be greater than zero." })
    price?: number;

    @IsOptional()
    @IsEnum(MenuItemType, { message: "Type must be a valid menu item type." })
    type?: MenuItemType;
}