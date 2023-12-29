import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';

@Injectable()
export class TokenService {

    constructor(private readonly configService: ConfigService) {}

    extractToken(params: any): string | null {
        return params?.token || null;
    }

    validateToken(token: string): any {
        try {
            const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
            return verify(token, refreshSecret);
        } catch (error) {
            return null;
        }
    }
}
