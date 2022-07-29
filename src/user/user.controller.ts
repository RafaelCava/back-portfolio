import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = { id };
    return await this.userService.find(user);
  }

  @Post('/')
  async create(@Body() user: Prisma.UserCreateInput): Promise<User> {
    return await this.userService.create(user);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() userBody: Prisma.UserUpdateInput,
  ): Promise<User> {
    const params = {
      where: { id },
      data: userBody,
    };
    return await this.userService.update(params);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<User> {
    return await this.userService.delete({ id });
  }
}
