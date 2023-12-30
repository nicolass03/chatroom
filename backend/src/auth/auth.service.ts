import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { Request, Response } from 'express';
import { User } from 'src/user/user.type';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(private readonly jwt: JwtService, private readonly prisma: PrismaService, private readonly config: ConfigService) {
    }
    async refreshToken(req: Request, res: Response) {
        const refreshToken = req.cookies['refresh_token'];
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found');
        }
        let data;
        try {
            data = this.jwt.verify(refreshToken, { secret: this.config.get('JWT_REFRESH_SECRET') });
        } catch {
            return res.send({ ok: false, accessToken: '' });
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id: data.id,
            },
        });
        if (!user) {
            throw new BadRequestException('User not found');
        }
        const accessToken = this.jwt.sign({...data}, { secret: this.config.get('JWT_ACCESS_SECRET') });
        res.cookie('access_token', accessToken, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true });
        return accessToken;
    }

    private async generateTokens(user: User, res: Response) {
        const data = { username: user.username, id: user.id };
        const accessToken = this.jwt.sign(data, { secret: this.config.get('JWT_ACCESS_SECRET'), expiresIn: '10m' });
        const refreshToken = this.jwt.sign(data, { secret: this.config.get('JWT_REFRESH_SECRET'), expiresIn: '1d' });

        res.cookie('access_token', accessToken, { httpOnly: true });
        res.cookie('refresh_token', refreshToken, { httpOnly: true });
        return  { user }
    }

    async validateUser(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: loginDto.email,
            },
        });
        if (!user) {
            throw new BadRequestException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid password');
        }
        return user;
    }

    async register(register: RegisterDto, res: Response) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                email: register.email,
            },
        });
        if(userExists) {
            throw new BadRequestException({email: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(register.password, 10);
        const user = await this.prisma.user.create({
            data: {
                username: register.username,
                email: register.email,
                password: hashedPassword,
            },
        });
        return this.generateTokens(user, res);
    }

    async login(loginDto: LoginDto, res: Response) {
        const user = await this.validateUser(loginDto);
        if (!user) {
            throw new BadRequestException({invalidCredentials: 'User not found'});
        }
        return this.generateTokens(user, res);
    }

    async logout(res: Response) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return 'Logged out successfully';
    }
}
