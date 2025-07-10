import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Request,
} from '@nestjs/common';
import { Request as expressRequest } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { PrescriptionService } from './prescription.service';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

@Controller('prescription')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Roles('DOCTOR')
  @Post()
  create(
    @Body() createPrescriptionDto: CreatePrescriptionDto,
    @Request() req: { user: { id: string } },
  ) {
    return this.prescriptionService.create(createPrescriptionDto, req.user.id);
  }

  @Roles('DOCTOR', 'PATIENT')
  @Get(`appointment/:appointmentId`)
  PrescriptionUnderAppointment(@Param('appointmentId') appointmentId: string) {
    return this.prescriptionService.PrescriptionUnderAppointment(appointmentId);
  }

  // @Roles('DOCTOR')
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.prescriptionService.findOne(id);
  // }

  @Roles('DOCTOR')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
    @Request() req: { user: { id: string } },
  ) {
    return this.prescriptionService.update(
      id,
      updatePrescriptionDto,
      req.user.id,
    );
  }

  @Roles('DOCTOR')
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: { user: { id: string } }) {
    return this.prescriptionService.remove(id, req.user.id);
  }
}
