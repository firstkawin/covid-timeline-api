import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class Timeline {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'patient_id' })
  patientId: number;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'detail' })
  detail: string;

  @Column({ name: 'location_type' })
  locationType: LOCATION_TYPE;

  @Column({ name: 'location_name', nullable: true })
  locationName: string;

  @Column({ name: 'is_delete', default: false })
  isDelete: boolean;

  @CreateDateColumn({ name: 'created_date', type: 'timestamp' })
  createdDate?: Date;

  @ManyToOne((type) => Patient)
  @JoinColumn({ name: 'patient_id' })
  public patient: Patient;
}

export enum LOCATION_TYPE {
  HOME = 'HOME',
  INDOOR = 'INDOOR',
  OUTDOOR = 'OUTDOOR',
  TRAVELLING = 'TRAVELLING,',
}
