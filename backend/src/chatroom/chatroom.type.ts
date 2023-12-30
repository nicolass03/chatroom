import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.type";

@ObjectType()
export class Chatroom {
    @Field(() => ID, {nullable: true})
    id?: number;

    @Field({nullable: true})
    name?: string;

    @Field({nullable: true})
    createdAt?: Date;

    @Field({nullable: true})
    updatedAt?: Date;

    @Field(() => [User],{nullable: true})
    users?: User[]

    @Field(() => [Message],{nullable: true})
    messages?: Message[]
}

@ObjectType()
export class Message {
    @Field(() => ID, {nullable: true})
    id?: number;

    @Field({nullable: true})
    message?: string;

    @Field({nullable: true})
    createdAt?: Date;

    @Field({nullable: true})
    updatedAt?: Date;

    @Field(() => User, {nullable: true})
    user?: User;

    @Field(() => Chatroom, {nullable: true})
    chatroom?: Chatroom;
}