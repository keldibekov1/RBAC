import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "user@example.com", description: "Foydalanuvchi email manzili" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "123456", description: "Parol kamida 6 ta belgidan iborat bolishi kerak" })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
