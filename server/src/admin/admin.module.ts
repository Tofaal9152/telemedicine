import { Module } from '@nestjs/common';
import { DoctorService } from 'src/doctor/doctor.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, DoctorService],
})
export class AdminModule {}
