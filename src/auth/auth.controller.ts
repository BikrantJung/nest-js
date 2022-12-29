import { Controller } from "@nestjs/common";
import { Post } from "@nestjs/common/decorators";
import { AuthService } from "./auth.service";

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

  @Post("login") // /auth/login
  login() {
    return this.authService.login();
  }
  @Post("register") // /auth/signin
  register() {
    return this.authService.register();
  }
}
