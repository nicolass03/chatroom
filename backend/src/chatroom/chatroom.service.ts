import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatroomService {

    constructor(private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
        private readonly userService: UserService) { }

    async getChatroomById(id: number) {
        return this.prisma.chatroom.findUnique({
            where: {
                id,
            },
        });
    }

    async createChatroom(name: string, userId: number) {
        const exists = await this.prisma.chatroom.findFirst({
            where: {
                name,
            },
        });
        if (exists) {
            throw new BadRequestException('Chatroom already exists');
        }
        return this.prisma.chatroom.create({
            data: {
                name,
                users: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async addUserToChatroom(chatroomId: number, userId: number) {
        const chatroom = await this.prisma.chatroom.findUnique({
            where: {
                id: chatroomId,
            },
        });
        if (!chatroom) {
            throw new BadRequestException('Chatroom not found');
        }

        return await this.prisma.chatroom.update({
            where: {
                id: chatroomId,
            },
            data: {
                users: {
                    connect: {
                        id: userId,
                    },
                },
            },
            include: {
                users: true,
            }
        });
    }

    async getUserChatrooms(userId: number) {
        return this.prisma.chatroom.findMany({
            where: {
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
            include: {
                users: {
                    orderBy: {
                        createdAt: 'desc',
                    }
                },
                messages: {
                    take: 1,
                    orderBy: {
                        createdAt: 'desc',
                    },
                }
            }
        });
    }

    async sendMessage(chatroomId: number, userId: number, message: string) {
        const chatroom = await this.prisma.chatroom.findUnique({
            where: {
                id: chatroomId,
            },
        });
        if (!chatroom) {
            throw new BadRequestException('Chatroom not found');
        }
        return this.prisma.message.create({
            data: {
                message,
                chatroomId,
                userId,
            },
            include: {
                chatroom: {
                    include: {
                        users: true
                    }
                },
                user: true
            }
        });
    }

    async getChatroomMessages(chatroomId: number) {
        const chatroom = await this.prisma.chatroom.findUnique({
            where: {
                id: chatroomId,
            },
        });
        if (!chatroom) {
            throw new BadRequestException('Chatroom not found');
        }
        return this.prisma.message.findMany({
            where: {
                chatroomId,
            },
            include: {
                chatroom: {
                    include: {
                        users: {
                            orderBy: {
                                createdAt: 'asc',
                            }
                        }
                    }
                },
                user: true
            },
        });
    }

    async deleteChatroom(chatroomId: number) {
        return this.prisma.chatroom.delete({
            where: {
                id: chatroomId,
            },
        })
    }

    async getAvailableChatrooms(userId: number) {
        const chatrooms = await this.prisma.chatroom.findMany({
            where: {
                users: {
                    none: {
                        id: userId,
                    },
                },
            },
        });
        return chatrooms;
    }
}
