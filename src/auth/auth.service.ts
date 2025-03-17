import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RobloxUser } from "./strategies/roblox/types/roblox-user.type";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async manageRobloxUser(user: RobloxUser) {
    return {
      accessToken: await this.jwtService.signAsync(user),
    };
  }
}
