import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import * as Strategy from "passport-roblox";
import { RobloxProfilePayload } from "./types/roblox-profile-payload.type";
import { RobloxUser } from "./types/roblox-user.type";

@Injectable()
export class RobloxStrategy extends PassportStrategy(Strategy, "roblox") {
  constructor() {
    super({
      clientID: process.env.ROBLOX_CLIENT_ID,
      clientSecret: process.env.ROBLOX_CLIENT_SECRET,
      callbackURL: `http://localhost:${process.env.APP_PORT}/auth/roblox/callback`,
      scope: "openid profile",
    } as any);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: RobloxProfilePayload,
  ): Promise<RobloxUser> {
    return {
      id: profile.id,
      username: profile.name,
      picture: profile.picture,
    };
  }
}
