import { LOCATION_TYPE } from 'src/entities/timeline.entity';

export interface ITimeline {
  patientId: number;
  detail: string;
  startDate: Date;
  endDate: Date;
  createdDate?: Date;
  locationName: string;
  locationType: LOCATION_TYPE;
}
