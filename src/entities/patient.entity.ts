import { GENDER } from 'src/patients/patients.dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Timeline } from './timeline.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: GENDER;

  @Column()
  age: number;

  @Column()
  occupation: string;

  @CreateDateColumn({ name: 'created_date', type: 'timestamp' })
  createdDate?: Date;

  @OneToMany((type) => Timeline, (timelines) => timelines.patient)
  @JoinColumn({ name: 'id' })
  public timelines: Timeline;
}
