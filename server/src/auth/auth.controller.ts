import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Role } from 'generated/prisma';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators';
import { GoogleAuthGuard, LocalAuthGuard, RefreshAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(
    @Request()
    req: {
      user: { id: number; name: string; email: string; role: Role };
    },
  ) {
    return this.authService.signin(
      req.user.id,
      req.user.role,
      req.user.name,
      req.user.email,
    );
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refresh(@Request() req: { user: { id: number } }) {
    return this.authService.refreshToken(req.user.id);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('callback/google')
  async googleCallback(
    @Request()
    req: { user: { id: number; name: string; email: string; role: Role } },
    @Res() resopnse: Response,
  ) {
    const res = await this.authService.signin(
      req.user.id,
      req.user.role,
      req.user.name,
      req.user.email,
    );
    resopnse.redirect(
      `http://localhost:3000/api/auth/google/callback?userId=${res.user.id}&email=${res.user.email}&role=${res.user.role}&accessToken=${res.accessToken}&refreshToken=${res.refreshToken}`,
    );
  }

  @Post('signout')
  signOut(@Req() req: { user: { id: number } }) {
    return this.authService.signOut(req.user.id);
  }
}
