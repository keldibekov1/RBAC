import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: "user@example.com", description: "Foydalanuvchi email manzili" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "123456", description: "Foydalanuvchi paroli" })
  @IsNotEmpty()
  password: string;
}
