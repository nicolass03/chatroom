import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateChatroomDto {
    @Field()
    @IsString()
    @IsNotEmpty({message: 'Name is required'})
    name:string;
}