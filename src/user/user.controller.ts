import { Controller, Get, UseGuards } from "@nestjs/common";
import { Req } from "@nestjs/common/decorators";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller("user")
export class UserController {
  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  getMe(@Req() req: Request) {
    return req.user;
  }
}
