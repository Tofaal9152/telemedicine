import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@Request() req: { user: { id: number } }) {
    return this.userService.getUser(req.user.id);
  }
}
