import { Args, Context, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ChatroomService } from './chatroom.service';
import { UserService } from 'src/user/user.service';
import { UseGuards } from '@nestjs/common';
import { Chatroom, Message } from './chatroom.type';
import { CreateChatroomDto } from './chatroom.dto';
import { Request } from 'express';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class ChatroomResolver {
    public pubsub: PubSub;
    constructor(private readonly charoomService: ChatroomService, private readonly userService: UserService) {
        this.pubsub = new PubSub();
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Chatroom)
    async createChatroom(@Args('input') input: CreateChatroomDto, @Context() context: { req: Request }) {
        const chatroom = await this.charoomService.createChatroom(input.name, context.req.user.id)
        await this.pubsub.publish(`newChatroom`, { newChatroom: chatroom });
        return chatroom;
    }

    @Mutation(() => Chatroom)
    async addUserToChatroom(@Args('chatroomId') chatroomId: number, @Args('userId') userId: number) {
        return this.charoomService.addUserToChatroom(chatroomId, userId);
    }

    @Query(() => [Chatroom])
    async getUserChatrooms(@Args('userId') userId: number) {
        return this.charoomService.getUserChatrooms(userId);
    }

    @Query(() => [Message])
    async getChatroomMessages(@Args('chatroomId') chatroomId: number) {
        return this.charoomService.getChatroomMessages(chatroomId);
    }

    @Mutation(() => String)
    async deleteChatroom(@Args('chatroomId') chatroomId: number) {
        const deleted = await this.charoomService.deleteChatroom(chatroomId);
        return `Chatroom ${deleted.name} deleted successfully`;
    }

    @Query(() => [Chatroom])
    async getAvailableChatrooms(@Args('userId') userId: number) {
        return this.charoomService.getAvailableChatrooms(userId);
    }

    @Subscription((returns) => Message, {
        nullable: true,
        resolve: (value) => value.newMessage,
    })
    newMessage(@Args('chatroomId') chatroomId: number) {
        return this.pubsub.asyncIterator(`newMessage_${chatroomId}`);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Message)
    async sendMessage(@Args('chatroomId') chatroomId: number, @Args('message') message: string, @Context() context: { req: Request }) {
        const msg = await this.charoomService.sendMessage(chatroomId, context.req.user.id, message);
        this.pubsub.publish(`newMessage_${chatroomId}`, { newMessage: msg });
        return msg
    }

    @Subscription((returns) => Chatroom, {
        nullable: true,
        resolve: (value) => value.newChatroom,
    })
    newChatroom() {
        return this.pubsub.asyncIterator(`newChatroom`);
    }
}
