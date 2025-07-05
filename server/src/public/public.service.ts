import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DoctorService } from 'src/doctor/doctor.service';

@Injectable()
export class PublicService {
  constructor(private readonly doctorService: DoctorService) {}
  async getApprovedDoctors(query: string, paginationDto: PaginationDto, baseUrl: string) {
    const page = paginationDto.page;
    const limit = paginationDto.limit;
    const skip = (page - 1) * limit;

    return this.doctorService.findApprovedDoctors(query, page, skip, limit, baseUrl);
  }

  
}
