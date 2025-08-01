import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }
  validate(email: string, password: string) {
    if (password === '') {
      throw new UnauthorizedException('Password is required');
    }
    return this.authService.validateUser(email, password);
  }
}
