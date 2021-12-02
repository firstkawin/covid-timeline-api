import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { Timeline } from 'src/entities/timeline.entity';
import { ITimeline } from 'src/interfaces/common.interface';
import { PatientsService } from 'src/patients/patients.service';
import { CreateTimelineDTO } from './timelines.dto';
import { TimelinesService } from './timelines.service';

@Controller('timelines')
export class TimelinesController {
  constructor(
    private timelinesService: TimelinesService,
    private patientsService: PatientsService,
  ) {}

  @Get(':name')
  async getLoctionTimelines(@Param('name') name: string) {
    return await this.timelinesService.getLocationTimelines(name);
  }

  @Post()
  async createTimeline(@Body() body: CreateTimelineDTO) {
    const patient = await this.patientsService.getPatientByQuery({
      name: body.name,
    });

    if (!patient) {
      throw new NotFoundException('name not found.');
    }

    delete body.name;
    const createTimelineData: ITimeline = {
      patientId: patient.id,
      ...body,
    };
    await this.timelinesService.createTimeline(createTimelineData);
  }

  @Delete(':id')
  async deleteTimeline(@Param('id') id) {
    await this.timelinesService.deleteTimeline(id);
  }
}
