import { Transform } from 'class-transformer';
import {  IsNumber, Min } from 'class-validator';

export class PaginationDTO {
    @Min(0)
    @IsNumber()
    page: number = 0;
}