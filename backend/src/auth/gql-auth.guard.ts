import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { ConfigService } from '@nestjs/config';
  import { Request } from 'express';
  
  @Injectable()
  export class GqlAuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private configService: ConfigService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const gqlCtx = context.getArgByIndex(2);
      const request: Request = gqlCtx.req;
      const token = this.getToken(request);
  
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        });
  
        request['user'] = payload;
      } catch (err) {
        throw new UnauthorizedException();
      }
  
      return true;
    }
  
    private getToken(request: Request): string | undefined {
      return request.cookies?.access_token;
    }
  }