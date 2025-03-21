import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "src/guards/role.guard";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles("ADMIN")
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
