import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { LoginDto } from "./dto/login.dto";
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

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
      delete user.password;
      // Return the user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          // Unique field error
          throw new ForbiddenException("Credentials taken");
        }
      }
      // throw error;
      console.log("error while registering");
    }
  }
  async login({ email, password }: LoginDto) {
    try {
      // Search for user in database
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      // Check if user exists
      if (!user) throw new ForbiddenException("Credentials Incorrect");

      // Check if password matches
      const doesPasswordMatches = await argon.verify(user.password, password);

      if (!doesPasswordMatches)
        throw new ForbiddenException("Credentials Incorrect");

      delete user.password;

      // Return Tokens
      return user;
    } catch (error) {
      throw error;
    }
  }
}
