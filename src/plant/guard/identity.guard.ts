import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IdentityGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user: any = request['user'];

    return true;

  }
}
