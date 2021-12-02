import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/entities/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDTO } from './patients.dto';

@Injectable()
export class PatientsService {
  @InjectRepository(Patient)
  private patientsRepository: Repository<Patient>;

  async getNamePatients(): Promise<Patient[]> {
    return await this.patientsRepository.find({
      select: ['name'],
      order: { id: 'DESC' },
    });
  }

  async getPatientByname(name: string): Promise<Patient> {
    const patient = await this.patientsRepository
      .createQueryBuilder('patient')
      .leftJoinAndSelect('patient.timelines', 'timeline')
      .where('patient.name = :name', { name })
      .andWhere('timeline.isDelete = :isDelete', { isDelete: false })
      .orderBy('timeline.startDate', 'ASC')
      .getOne();
    return patient;
  }

  async getPatientByQuery(query): Promise<Patient> {
    return await this.patientsRepository.findOne({ ...query });
  }

  async createPatient(body: CreatePatientDTO) {
    await this.patientsRepository.save(body);
  }
}
