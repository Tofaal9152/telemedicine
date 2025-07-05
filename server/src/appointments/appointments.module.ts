import { Module } from '@nestjs/common';
import { DoctorService } from 'src/doctor/doctor.service';
import { PatientService } from 'src/patient/patient.service';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';

@Module({
  controllers: [AppointmentsController],
  providers: [
    AppointmentsService,
    DoctorService,
    PatientService,
  ],
})
export class AppointmentsModule {}
