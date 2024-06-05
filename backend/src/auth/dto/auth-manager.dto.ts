import { IsDefined, IsNotEmpty } from 'class-validator';

//contains the DTOs expected to be used to login
export class AuthManagerDto {
  @IsDefined()
  @IsNotEmpty()
  password: string;
  @IsDefined()
  @IsNotEmpty()
  username: string;
}
