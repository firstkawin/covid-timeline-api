import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timeline } from 'src/entities/timeline.entity';
import { PatientsModule } from 'src/patients/patients.module';
import { TimelinesController } from './timelines.controller';
import { TimelinesService } from './timelines.service';

@Module({
  imports: [TypeOrmModule.forFeature([Timeline]), PatientsModule],
  controllers: [TimelinesController],
  providers: [TimelinesService],
})
export class TimelinesModule {}
