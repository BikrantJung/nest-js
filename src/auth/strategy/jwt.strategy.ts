import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, "jwt") {
  // Default 'jwt'
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("JWT_SECRET"),
    });
  }
  async validate({ sub }: { sub: number; email: string }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: sub,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      console.log("Error in validate jwt.strategy.ts");
    }
  }
}
