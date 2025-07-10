import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { CommonModule } from './common/common.module';
import { PublicModule } from './public/public.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    AdminModule,
    DoctorModule,
    PatientModule,
    CommonModule,
    PublicModule,
    AppointmentsModule,
    PrescriptionModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
