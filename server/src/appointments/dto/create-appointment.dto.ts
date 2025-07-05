import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

}
