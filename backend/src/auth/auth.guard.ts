import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const ctx = context.getArgByIndex(2);
            const request = ctx.req;
            const token = request.cookies['access_token'];
            if (token) {
                const decoded = await this.jwtService.verify(token, { secret: this.configService.get('JWT_ACCESS_SECRET') });
                request.user = decoded;
                return true;
            } else {
                throw new UnauthorizedException('Unauthorized');
            }
        } catch (error) {
            throw new UnauthorizedException('Unauthorized');
        }
    }
}
