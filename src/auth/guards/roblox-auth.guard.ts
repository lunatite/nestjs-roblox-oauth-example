import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class RobloxAuthGuard extends AuthGuard("roblox") {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    if (err || !user) {
      throw new BadRequestException(err);
    }

    return user;
  }
}
