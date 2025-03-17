import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RobloxAuthGuard } from "./guards/roblox-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @UseGuards(RobloxAuthGuard)
  @Get("login")
  login() {
    return;
  }

  @UseGuards(RobloxAuthGuard)
  @Get("roblox/callback")
  async callback(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = await this.service.manageRobloxUser(
      req["user"] as any,
    );

    res.cookie("auth", accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.redirect(process.env.FRONTEND_URL!);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/user")
  user(@Req() req: Request) {
    return req.user;
  }
}
