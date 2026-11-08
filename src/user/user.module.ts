import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { PrismaService } from '../lib/prisma/prisma.service.js';

@Module({
  imports: [PrismaService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
