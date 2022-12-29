import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
  login() {
    return "Logged in";
  }
  register() {
    return "Registered";
  }
}
