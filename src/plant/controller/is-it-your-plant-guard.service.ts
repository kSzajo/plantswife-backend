import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsItYourPlantGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    console.log('roles guard triggered');

    const request = context.switchToHttp().getRequest<Request>();
    const user: any = request['user'];

    console.log('body', request.body);
    console.log('user', user);
    return true;

  }
}
