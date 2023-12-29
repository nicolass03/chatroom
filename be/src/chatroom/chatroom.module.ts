import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomResolver } from './chatroom.resolver';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ChatroomService, ChatroomResolver, UserService, ConfigService, PrismaService, JwtService]
})
export class ChatroomModule {}
