import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { PrismaModule } from '../lib/prisma/prisma.module.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule, ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
