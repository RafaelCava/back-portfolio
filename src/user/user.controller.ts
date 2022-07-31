import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findAll(): Promise<any[]> {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<any> {
    const user = { id };
    return await this.userService.find(user);
  }

  @Post('/')
  async create(@Body() user: Prisma.UserCreateInput): Promise<any> {
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
