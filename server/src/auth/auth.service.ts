import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { CreateGooleUserDto } from 'src/user/dto/create-google.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import refreshConfig from './config/refresh.config';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { Role } from 'generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {}
  // Sign up method
  async signup(dto: CreateUserDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (user) {
      throw new ConflictException('User already exists!');
    }
    const newUser = await this.userService.create(dto);
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      message: 'User created successfully!',
    };
  }
  // Sign in method
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    if (!user.password) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
  async signin(userId: number, role: Role, name?: string, email?: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await hash(refreshToken);
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);
    return {
      user: {
        id: userId,
        email,
        name,
        role,
      },
      accessToken,
      refreshToken,
    };
  }
  // validate method for JWT strategy
  async validateJwtUser(userId: number) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    return {
      id: user.id,
      role: user.role,
    };
  }
  // Refresh token method

  async refreshToken(userId: number, name?: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    const hashedRefreshToken = await hash(refreshToken);
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: userId,
        name,
      },
    };
  }
  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    if (!user.hashedRefreshToken) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    const isRefreshTokenValid = await verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    return {
      id: user.id,
    };
  }
  // Geneerate Token -signin & refreshToken
  async generateTokens(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    console.log('Generating tokens for user:', userId);
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);
    console.log('Access Token:', accessToken);
    return {
      accessToken,
      refreshToken,
    };
  }
  // Validate Google user
  async validateGoogleUser(googleUser: CreateGooleUserDto) {
    const user = await this.userService.findByEmail(googleUser.email);
    if (user) return user;
    return await this.userService.createGoogleLogin(googleUser);
  }
  // Sign out method
  async signOut(userId: number) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    await this.userService.updateRefreshToken(userId, null);
    return {
      message: 'User signed out successfully!',
    };
  }
}
