import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationService } from 'src/common/services/pagination.service';
import { sanitizeUser } from 'src/common/utils/sanitize-user.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const { password, ...user } = createDoctorDto;
    const hashedPassword = await hash(password);

    return await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        age: user.age,
        gender: user.gender,
        role: 'DOCTOR',
        doctor: {
          create: {
            bio: user.bio,
            specialty: user.specialty,
            experience: user.experience,
          },
        },
      },
      include: {
        doctor: true,
      },
    });
  }

  async findAll(paginationDto: PaginationDto, baseUrl: string) {
    const page = paginationDto.page;
    const limit = paginationDto.limit;
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        where: { role: 'DOCTOR' },
        select: {
          id: true,
          email: true,
          name: true,
          age: true,
          gender: true,
          doctor: {
            select: {
              bio: true,
              experience: true,
              specialty: true,
              isApproved: true,
            },
          },
          createdAt: true,
        },
      }),
      this.prisma.user.count({ where: { role: 'DOCTOR' } }),
    ]);

    const meta = this.paginationService.buildPaginationMeta(
      baseUrl,
      page,
      limit,
      total,
    );

    return { ...meta, results: data };
  }

  async findOne(id: string) {
    const doctor = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
        role: 'DOCTOR',
      },
      include: {
        doctor: true,
      },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with id ${id} not found`);
    }
    return sanitizeUser(doctor);
  }

  async remove(id: string) {
    const doctor = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
        role: 'DOCTOR',
      },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with id ${id} not found`);
    }

    const deleteUser = await this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    if (!deleteUser) {
      throw new NotFoundException(`Doctor with id ${id} could not be removed`);
    }
    return { message: `Doctor with id ${id} removed successfully` };
  }

  async setApproval(id: string, isApproved: boolean) {
    const doctor = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
        role: 'DOCTOR',
      },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with id ${id} not found`);
    }

    const updatedDoctor = await this.prisma.user.update({
      where: { id: Number(id) },
      data: {
        doctor: {
          update: { isApproved },
        },
      },
      include: { doctor: true },
    });

    return sanitizeUser(updatedDoctor);
  }
}
