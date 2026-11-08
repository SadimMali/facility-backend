import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service.js';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  async getUserById(@Param('userId') userId: string) {
    return this.userService.getUserById(userId);
  }
}
