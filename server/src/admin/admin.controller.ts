import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AdminService } from './admin.service';

@Controller('admin')
@Roles('ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // patients
  @Get('patients')
  findAllPatients(
    @Query() paginationDto: PaginationDto,
    @Req() request: Request,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.path}`;
    return this.adminService.findAllPatients(paginationDto, baseUrl);
  }

  @Get('patient/:id')
  findOnePatient(@Param('id', ParseIntPipe) id: string) {
    return this.adminService.findOnePatient(id);
  }
  //  remove patient
  @Delete('patient/:id')
  removePatient(@Param('id', ParseIntPipe) id: string) {
    return this.adminService.removePatient(id);
  }

  // Doctors
  @Get('doctors')
  findAllDoctors(
    @Query() paginationDto: PaginationDto,
    @Req() request: Request,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.path}`;
    return this.adminService.findAllDoctors(paginationDto, baseUrl);
  }

  @Get('doctor/:id')
  findOneDoctor(@Param('id', ParseIntPipe) id: string) {
    return this.adminService.findOneDoctor(id);
  }

  @Delete('doctor/:id')
  removeDoctor(@Param('id', ParseIntPipe) id: string) {
    return this.adminService.removeDoctor(id);
  }

  // Approve doctor
  @Patch('doctor/:id/approval')
  approveDoctor(
    @Param('id', ParseIntPipe) id: string,
    @Body('isApproved', ParseBoolPipe) isApproved: boolean,
  ) {
    return this.adminService.setApproval(id, isApproved);
  }
}
