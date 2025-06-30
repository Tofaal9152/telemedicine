import { Global, Module } from '@nestjs/common';
import { PaginationService } from './services/pagination.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Global()
@Module({
  providers: [PaginationService, PrismaService],
  exports: [PaginationService, PrismaService],
})
export class CommonModule {}
