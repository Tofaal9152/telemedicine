import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationService } from 'src/common/services/pagination.service';
import { DoctorService } from 'src/doctor/doctor.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationService: PaginationService,
    private readonly doctorService: DoctorService,
  ) {}

  // patients
  async findAllPatients(paginationDto: PaginationDto, baseUrl: string) {
    const page = paginationDto.page;
    const limit = paginationDto.limit;
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        where: { role: 'PATIENT' },
        select: {
          id: true,
          email: true,
          name: true,
          age: true,
          gender: true,
          createdAt: true,
        },
      }),
      this.prisma.user.count({ where: { role: 'PATIENT' } }),
    ]);

    const meta = this.paginationService.buildPaginationMeta(
      baseUrl,
      page,
      limit,
      total,
    );

    return { ...meta, results: data };
  }

  async findOnePatient(id: string) {
    const patient = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
        role: 'PATIENT',
      },
      select: {
        id: true,
        email: true,
        name: true,
        age: true,
      },
    });
    if (!patient) {
      throw new NotFoundException(`Patient with id ${id} not found`);
    }
    return patient;
  }

  async removePatient(id: string) {
    const patient = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
        role: 'PATIENT',
      },
    });
    if (!patient) {
      throw new NotFoundException(`Patient with id ${id} not found`);
    }
    await this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    return { message: `Patient with id ${id} removed successfully` };
  }

  // Doctors
  async findAllDoctors(paginationDto: PaginationDto, baseUrl: string) {
    return this.doctorService.findAll(paginationDto, baseUrl);
  }

  async findOneDoctor(id: string) {
    return this.doctorService.findOne(id);
  }

  async removeDoctor(id: string) {
    return this.doctorService.remove(id);
  }

  async setApproval(id: string, isApproved: boolean) {
    return this.doctorService.setApproval(id, isApproved);
  }
}