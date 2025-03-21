import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("Authentication") 
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Foydalanuvchi royxatdan otishi" })
  @ApiResponse({ status: 201, description: "Royxatdan otish muvaffaqiyatli" })
  @Post("register")
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: "Foydalanuvchi login qilishi" })
  @ApiResponse({ status: 200, description: "Login muvaffaqiyatli" })
  @Post("login")
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: "Refresh token orqali yangi token olish" })
  @ApiResponse({ status: 200, description: "Yangi access va refresh token" })
  @Post("refresh")
  async refresh(@Body("refreshToken") refreshToken: string) {
    return this.authService.refreshTokens(refreshToken);
  }

  @ApiOperation({ summary: "Emailni tasdiqlash" })
  @ApiResponse({ status: 200, description: "Email muvaffaqiyatli tasdiqlandi" })
  @Get("verify-email")
  async verifyEmail(@Query("token") token: string) {
    return this.authService.verifyEmail(token);
  }
}
