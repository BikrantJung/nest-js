import { Controller, Get, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator";
import { JWTGuard } from "src/auth/guard";

@UseGuards(JWTGuard)
@Controller("user")
export class UserController {
  @Get("me")
  getMe(@GetUser() user: User, @GetUser("email") email: string) {
    // can also access email from user
    console.log(email);
    return user;
  }
}
