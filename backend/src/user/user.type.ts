import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field({nullable: true})
    id?: number;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field({nullable: true})
    password?: string;

    @Field({nullable: true})
    createdAt?: Date;

    @Field({nullable: true})
    updatedAt?: Date;
}
