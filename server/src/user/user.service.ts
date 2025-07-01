import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';
import { CreateGooleUserDto } from './dto/create-google.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const { password, ...user } = dto;

    const hashedPassword = await hash(password);

    return await this.prisma.user.create({
      data: {
        password: hashedPassword,
        ...user,
        role: 'ADMIN',
      },
    });
  }
  async createGoogleLogin(dto: CreateGooleUserDto) {
    const { ...user } = dto;

    return await this.prisma.user.create({
      data: {
        ...user,
        role: 'PATIENT',
        patient: {
          create: {},
        },
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async updateRefreshToken(userId: number, refreshToken: string | null) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken: refreshToken,
      },
    });
  }

  async getUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        doctor: true,
        patient: true,
        admin: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const { password, hashedRefreshToken, doctor, patient, admin, ...rest } =
      user;
    const roleData = {
      ...(doctor ? { doctor } : {}),
      ...(patient ? { patient } : {}),
      ...(admin ? { admin } : {}),
    };
    return {
      ...rest,
      ...roleData,
    };
  }
}
