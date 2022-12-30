import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { LoginDto } from "./login.dto";

export class AuthDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
