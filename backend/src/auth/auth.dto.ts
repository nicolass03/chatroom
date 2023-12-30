import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

@InputType()
export class RegisterDto {
    @Field()
    @IsNotEmpty({ message: 'Username is required' })
    @IsString({ message: 'Username must be a string' })
    username: string;

    @Field()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(5, { message: 'Password should be at least 5 characters long' })
    password: string;

    @Field()
    @IsNotEmpty({ message: 'Confirm password is required' })
    confirmPassword: string;

    @Field()
    @IsNotEmpty({ message: 'Username is required' })
    @IsEmail({}, { message: 'Email must be valid' })
    email: string;
}

@InputType()
export class LoginDto {
    @Field()
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @Field()
    @IsNotEmpty({ message: 'Username is required' })
    @IsEmail({}, { message: 'Email must be valid' })
    email: string;
}