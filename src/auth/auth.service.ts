// 📌 src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import * as nodemailer from "nodemailer";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
      },
    });

    await this.sendVerificationEmail(dto.email, user.id);
    return { message: "Check your email to verify your account." };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException("Invalid credentials");

    const tokens = await this.generateTokens(user.id, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async generateTokens(userId: string, role: string) {
    const accessToken = this.jwtService.sign({ userId, role }, { expiresIn: "15m" });
    const refreshToken = this.jwtService.sign({ userId }, { expiresIn: "7d" });

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedToken },
    });
  }

  async refreshTokens(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      const user = await this.prisma.user.findUnique({ where: { id: decoded.userId } });

      if (!user || !user.refreshToken) throw new UnauthorizedException("Invalid refresh token");
      if (!(await bcrypt.compare(refreshToken, user.refreshToken))) throw new UnauthorizedException("Invalid refresh token");

      const tokens = await this.generateTokens(user.id, user.role);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async sendVerificationEmail(email: string, userId: string) {
    const token = this.jwtService.sign({ userId }, { expiresIn: "1d" });
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { 
        user: "testotpn16@gmail.com", 
        pass: "mkqv gjzq bfhh inwi"    
      },
    });
  
    const link = `http://localhost:3000/auth/verify-email?token=${token}`;
  
    await transporter.sendMail({
      from: "testotpn16@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `Click the link to verify your email: ${link}`,
    });
  }
  

  async verifyEmail(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      await this.prisma.user.update({
        where: { id: decoded.userId },
        data: { isVerified: true },
      });
      return { message: "Email successfully verified!" };
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
