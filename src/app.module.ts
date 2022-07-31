import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { MessageService } from './message/message.service';
import { UserController } from './user/user.controller';
import { MessageController } from './message/message.controller';
import { WebsocketService } from './websocket/websocket.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController, MessageController],
  providers: [PrismaService, UserService, MessageService, WebsocketService],
})
export class AppModule {}
