import { Controller, Get, Query, Req } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Public } from 'src/auth/decorators';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Request } from 'express';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Public()
  @Get('approved-doctors')
  getApprovedDoctors(
    @Query() paginationDto: PaginationDto,
    @Req() request: Request,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.path}`;
    return this.doctorService.getApprovedDoctors(paginationDto, baseUrl);
  }
}
