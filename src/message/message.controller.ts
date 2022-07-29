import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Message, Prisma } from '@prisma/client';
import ParamsRequestFindAllDto from 'src/infra/dto/params-request-findAll.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('/')
  async findAll(
    @Query()
    query: ParamsRequestFindAllDto,
  ): Promise<Message[]> {
    return await this.messageService.findAll(query);
  }

  @Get('/:id')
  async find(
    @Param('id')
    id: string,
  ): Promise<Message> {
    return await this.messageService.find({ id });
  }

  @Post('/')
  async create(@Body() message: Prisma.MessageCreateInput): Promise<Message> {
    return await this.messageService.create(message);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() user: Prisma.MessageUpdateInput,
  ): Promise<Message> {
    const params = {
      where: { id },
      data: user,
    };
    return await this.messageService.update(params);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Message> {
    return await this.messageService.delete({ id });
  }
}
