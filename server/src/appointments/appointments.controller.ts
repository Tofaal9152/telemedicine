import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Request,
  Res,
} from '@nestjs/common';
import { Request as expressRequest, Response } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Public } from 'src/auth/decorators';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // Create an appointment
  @Roles('PATIENT')
  @Post('payment')
  createAppointment(
    @Body() appointmentDto: CreateAppointmentDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.appointmentsService.appointmentsService(
      appointmentDto,
      req.user.id,
    );
  }
  // successfully created appointment
  @Public()
  @Post('payment/success/:tran_id')
  async AppointmentsSuccess(
    @Param('tran_id') tranId: string,
    @Res() res: Response,
  ) {
    const result = await this.appointmentsService.appointmentsSuccess(tranId);
    return res.redirect(result.redirectUrl);
  }

  @Public()
  @Post('payment/fail/:tran_id')
  async AppointmentsFail(
    @Param('tran_id') tranId: string,
    @Res() res: Response,
  ) {
    const result = await this.appointmentsService.appointmentsFail(tranId);
    return res.redirect(result.redirectUrl);
  }

  @Public()
  @Post('payment/cancel/:tran_id')
  async AppointmentsCancel(
    @Param('tran_id') tranId: string,
    @Res() res: Response,
  ) {
    const result = await this.appointmentsService.appointmentsCancel(tranId);
    return res.redirect(result.redirectUrl);
  }

  // get all appointments of a patient
  @Roles('PATIENT')
  @Get('all')
  async getAllAppointments(
    @Query() paginationDto: PaginationDto,
    @Request() req: { user: { id: number } },

    @Req() request: expressRequest,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.path}`;
    return this.appointmentsService.getAllAppointments(
      paginationDto,
      baseUrl,
      req.user.id,
    );
  }
}
