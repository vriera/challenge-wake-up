

import { IsDecimal, IsDefined, IsEnum, IsNotEmpty, IsNumber, IsPositive, Matches, Min } from "class-validator"
import { MenuItemType } from "../enums/menu-item-type.enum";


export class MenuItemDTO{
    
    @IsDefined()
    @IsNotEmpty()
    name: string;
    
    @IsDefined()
    @IsNotEmpty()
    description: string;

    @IsDefined()
    @IsNotEmpty()
    @Min(0)
    @IsNumber({maxDecimalPlaces: 2} , { message: "Price must not have more than two decimal places." })
    @IsPositive({ message: "Price must be greater than zero." })
    price:number;

    @IsDefined()
    @IsNotEmpty()
    @IsEnum(MenuItemType)
    type:MenuItemType;
}


// @Entity()
// export class MenuItem {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column('text')
//   description: string;

//   @ManyToOne(() => Manager)
//   @Column()
//   manager: Manager;


//   @Column("decimal", {scale: 2 })
//   price: number;

//   @Column()
//   type: MenuItemType;
// }

