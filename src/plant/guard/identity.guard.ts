import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PlantsService } from '../service/plants.service';
import { User } from '../../users/entity/user.entity';

@Injectable()
export class IdentityGuard implements CanActivate {

  constructor(private plantsService: PlantsService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const plantId: number | undefined = Number(request['params']['id']);
    const user: User = request['user'];
    const userId: string = user.id;

    return await this.plantsService.isPlantOwner({ plantId: plantId, userId: userId });
  }
}
