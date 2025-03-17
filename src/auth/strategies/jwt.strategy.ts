import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { RobloxUser } from "./roblox/types/roblox-user.type";

export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && "auth" in req.cookies && req.cookies.auth.length > 0) {
      return req.cookies.auth;
    }
    return null;
  }

  async validate(payload: RobloxUser) {
    return payload;
  }
}
