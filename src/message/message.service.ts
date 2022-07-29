import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message, Prisma } from '@prisma/client';
import ParamsRequestFindAllDto from 'src/infra/dto/params-request-findAll.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async find(
    messageWhereUniqueInput: Prisma.MessageWhereUniqueInput,
  ): Promise<Message | null> {
    return this.prisma.message.findUnique({
      where: messageWhereUniqueInput,
      include: {
        user: true,
      },
    });
  }

  async findAll(params: ParamsRequestFindAllDto): Promise<Message[]> {
    return this.prisma.message.findMany({
      skip: params?.skip && Number(params?.skip),
      take: params?.limit && Number(params?.limit),
      where: {
        user: {
          id: params?.userId,
        },
      },
      include: {
        user: true,
      },
    });
  }

  async create(data: Prisma.MessageCreateInput): Promise<Message> {
    return this.prisma.message.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.MessageWhereUniqueInput;
    data: Prisma.MessageUpdateInput;
  }): Promise<Message> {
    const { data, where } = params;
    return this.prisma.message.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.MessageWhereUniqueInput): Promise<Message> {
    return this.prisma.message.delete({
      where,
    });
  }
}
