import { Controller, Post } from "@nestjs/common";
import { Body } from "@nestjs/common/decorators";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

// Controller is going to call a function from .service.ts
// Controllers are responsible for creating endpoints
@Controller("auth")
export class AuthController {
  //* Creates a new instance (authService = new AuthService()) and passes to controller

  /*  authService: AuthService;
     constructor(authService: AuthService) {
       this.authService = authService;
     }
  */
  constructor(private authService: AuthService) {}

  // login(@Req() req: Request) {
  // We should not use Request from a library, what if we chang the library later so...
  //   return this.authService.login();
  // }
  @Post("login") // /auth/login
  login(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.login();
  }
  @Post("register") // /auth/signin
  register() {
    return this.authService.register();
  }
}
