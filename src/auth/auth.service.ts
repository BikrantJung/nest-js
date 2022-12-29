import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login() {
    return "Logged in";
  }
  async register({ email, password, firstName, lastName }: AuthDto) {
    // Generate the password hash
    try {
      const hash = await argon.hash(password);
      // Save in database
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hash,
          firstName,
          lastName,
        },
      });
      // Return the user
      return user;
    } catch (error) {
      console.log("error while registering");
    }
    const hash = await argon.hash(password);
    // Save in database
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hash,
        firstName,
        lastName,
      },
    });
    // Return the user
    return user;
  }
}
