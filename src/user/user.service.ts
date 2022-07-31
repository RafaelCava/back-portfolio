import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { hashSync } from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async find(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<any | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    const { password, ...result } = user;
    return result;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findAll(): Promise<any[]> {
    const users = await this.prisma.user.findMany({
      include: {
        messages: true,
      },
    });
    return users.map((user) => {
      const { password, ...result } = user;
      return result;
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<any> {
    const { password } = data;
    const hash = hashSync(password, 11);
    data['password'] = hash;
    return this.prisma.user.create({
      data,
      select: {
        name: true,
        email: true,
        id: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    return this.prisma.user.update({
      ...params,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}
