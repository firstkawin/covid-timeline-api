import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotAcceptableException,
  Param,
  Post,
} from '@nestjs/common';
import { CreatePatientDTO } from './patients.dto';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Get('name')
  async getNamePatients() {
    return await this.patientsService.getNamePatients();
  }

  @Get('timelines/:name')
  async getPatientByname(@Param('name') name: string) {
    if (!name) {
      throw new BadRequestException('name not found');
    }
    return await this.patientsService.getPatientByname(name);
  }

  @Post()
  async createPatient(@Body() body: CreatePatientDTO) {
    const patient = await this.patientsService.getPatientByQuery({
      name: body.name,
    });
    if (patient) {
      console.log(patient);
      throw new NotAcceptableException('name already exists');
    }
    await this.patientsService.createPatient(body);
  }
}
