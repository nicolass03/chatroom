import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from './token/token.service';
import { ChatroomModule } from './chatroom/chatroom.module';

@Module({
  imports: [
    AuthModule, 
    UserModule,
    GraphQLModule.forRootAsync({
      imports: [ConfigModule, AppModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService, tokenService: TokenService) => ({
        debug: true,
        playground: true,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        cors: {
          origin: 'http://localhost:5173',
          credentials: true,
        },
        installSubscriptionHandlers: true,
        subscriptions: {
          'graphql-ws': true,
          'subscriptions-transport-ws': true,
        },
        context: ({ req, res, connection }) => {
          if (connection) {
            return { req, res, user: connection.context.user };
          }
          return { req, res }
        },
        onConnect: (params) => {
          const token = tokenService.extractToken(params);
          if (!token) {
            throw new Error('Token not found!');
          }
          const user = tokenService.validateToken(token);
          if (!user) {
            throw new Error('Invalid token!');
          }
          return { user };
        } 
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ChatroomModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
