
import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserDto } from 'modules/usermodule/dto/user.dto';
import { USER_ROLE } from 'modules/usermodule/user.roles';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<string>('role', context.getHandler());
    if (!role) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserDto;
    return user.role === role;
  }
}

export const Role = (role: USER_ROLE) => SetMetadata('role', role);