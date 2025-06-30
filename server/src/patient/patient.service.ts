import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationService } from 'src/common/services/pagination.service';
import { sanitizeUser } from 'src/common/utils/sanitize-user.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    const { password, ...user } = createPatientDto;
    const hashedPassword = await hash(password);

    const newPatient = await this.prisma.user.create({
      data: {
        password: hashedPassword,
        ...user,
      },
    });
    return sanitizeUser(newPatient);
  }

  findAll() {
    return 'This action returns all patients';
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        age: true,
        gender: true,
        createdAt: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
// update(id: number, updatePatientDto: UpdatePatientDto) {
//   return this.prisma.user.update({
//     where: {
//       id,
//     },
//     data: {
//       ...updatePatientDto,
//     },
//   });
// }
