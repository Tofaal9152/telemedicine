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
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationModule } from './notification/notification.module';
@Module({
  imports: [
    ScheduleModule.forRoot(),
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
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
