import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Timeline } from 'src/entities/timeline.entity';
import { ITimeline } from 'src/interfaces/common.interface';
import { PatientsService } from 'src/patients/patients.service';
import { Repository } from 'typeorm';
import { CreateTimelineDTO } from './timelines.dto';

@Injectable()
export class TimelinesService {
  @InjectRepository(Timeline)
  private timelinesRepository: Repository<Timeline>;

  constructor(private patientsService: PatientsService) {}

  async createTimeline(body: ITimeline): Promise<void> {
    await this.timelinesRepository.save(body);
  }

  async getLocationTimelines(name: string): Promise<Timeline[]> {
    const patient = await this.patientsService.getPatientByname(name);
    if (!patient) {
      throw new NotFoundException('patient not found');
    }
    const timelines = await this.timelinesRepository.find({
      select: ['locationName'],
      where: { patientId: patient.id },
      order: { locationName: 'ASC' },
    });

    return timelines;
  }

  async deleteTimeline(id:number) {
    await this.timelinesRepository.update({ id }, { isDelete: true });
  }
}
