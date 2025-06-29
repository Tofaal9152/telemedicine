import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  getUser(@Request() req: { user: { id: number } }) {
    return this.userService.getUser(req.user.id);
  }
  @Get('/demo-data')
  getDemoData(@Request() req: { user: { id: number } }) {
    return this.userService.getDemoData();
  }
}
