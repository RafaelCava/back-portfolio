import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { MessageService } from './message/message.service';
import { UserController } from './user/user.controller';
import { MessageController } from './message/message.controller';

@Module({
  imports: [],
  controllers: [UserController, MessageController],
  providers: [AppService, PrismaService, UserService, MessageService],
})
export class AppModule {}
