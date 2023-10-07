import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CacheService } from '../cache/cache.service';
import { Role } from '../common/constants';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly cacheService: CacheService,
  ) {}

  hasRole(userRole: Role, requiredRoles: Role[]): boolean {
    // 判断用户角色是否为管理员
    if (userRole === Role.Admin) {
      return true; // 管理员拥有所有权限，直接返回 true
    }

    // 基础权限
    const baseRole = [Role.Guest, Role.Banned].some((role) =>
      requiredRoles.includes(role),
    );

    // 游客
    if (userRole === Role.Guest && requiredRoles.includes(userRole)) {
      return true;
    }

    // 用户
    if (
      userRole === Role.User &&
      (baseRole || requiredRoles.includes(userRole))
    ) {
      return true;
    }

    // 被封禁
    if (userRole === Role.Banned && baseRole) {
      return true;
    }

    if (
      userRole === Role.Banned &&
      (requiredRoles.includes(Role.User) || requiredRoles.includes(Role.Admin))
    ) {
      // 报错 无权限
      // 当用户是被封的状态那么 并且接口要求的是 user admin
      throw new HttpException(
        '您无权限，请联系管理员。',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    throw new HttpException(
      '您无权限，请联系管理员。',
      HttpStatus.NOT_ACCEPTABLE,
    );
  }

  // hasRole(userRole: Role, requiredRoles: Role[]): boolean {
  //   // 判断用户角色是否为管理员
  //   if (userRole === Role.Admin) {
  //     return true; // 管理员拥有所有权限，直接返回 true
  //   }

  //   // 基础权限
  //   const baseRole = [Role.Guest, Role.Banned].includes(requiredRole);

  //   // 游客
  //   if (userRole === Role.Guest && userRole === requiredRole) {
  //     return true;
  //   }

  //   // 用户
  //   if (userRole === Role.User && (baseRole || requiredRole === userRole)) {
  //     return true;
  //   }

  //   // 被封禁
  //   if (userRole === Role.Banned && baseRole) {
  //     return true;
  //   }

  //   if (
  //     userRole === Role.Banned &&
  //     (requiredRole === Role.User || requiredRole === Role.Admin)
  //   ) {
  //     // 报错 无权限
  //     // 当用户是被封的状态那么 并且接口要求的是 user admin
  //     return false;
  //   }

  //   return false;
  // }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    console.log('RolesGuard: ', roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request?.customProps?.user_id || undefined;
    const userRole = Role.Guest;
    if (userId) {
      // 查询数据 然后或者角色在赋值
    }
    // 这里查询缓存 数据库拿用户的角色是什么
    return this.hasRole(userRole, roles);
    // const request = context.switchToHttp().getRequest();
    // const user = request.user;
    // return roles.includes(user.role);
  }
}
