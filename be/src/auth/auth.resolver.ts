import { Resolver, Query, Context, Mutation, Args } from '@nestjs/graphql';
import { LoginResponse, RegisterResponse } from './auth.type';
import { LoginDto, RegisterDto } from './auth.dto';
import { BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

@Resolver()
export class AuthResolver {

    constructor(private readonly authService: AuthService) { }

    @Mutation(() => RegisterResponse)
    async register(@Args('input') input: RegisterDto, @Context() ctx: { res: Response }) {
        try {
            console.log(input);
            
            if (input.password !== input.confirmPassword) {
                return new BadRequestException('Passwords do not match');
            }
            const { user } = await this.authService.register(input, ctx.res);
            return { user };
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Mutation(() => LoginResponse)
    async login(@Args('input') input: LoginDto, @Context() ctx: { res: Response }) {
        try {
            const { user } = await this.authService.login(input, ctx.res);
            return { user };
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Mutation(() => String)
    async logout(@Context() ctx: { res: Response }) {
        try {
            return this.authService.logout(ctx.res);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Mutation(() => String)
    async refreshToken(@Context() ctx: { req: Request, res: Response }) {
        try {
            return this.authService.refreshToken(ctx.req, ctx.res);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Query(() => String)
    async hello() {
        return 'hello';
    }
}
