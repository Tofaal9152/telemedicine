import { Controller, Get, Request } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  @Get()
  getUser(@Request() req: { user: { id: number } }) {
    return this.userService.getUser(req.user.id);
  }
}
