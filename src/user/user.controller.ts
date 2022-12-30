import { Controller, Get, UseGuards } from "@nestjs/common";
import { Req } from "@nestjs/common/decorators";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { JWTGuard } from "src/auth/guard";

@Controller("user")
export class UserController {
  @UseGuards(JWTGuard)
  @Get("me")
  getMe(@Req() req: Request) {
    return req.user;
  }
}
