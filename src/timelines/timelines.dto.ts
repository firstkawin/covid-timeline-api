import {
  IsDateString,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { LOCATION_TYPE } from 'src/entities/timeline.entity';

export enum GENDER {
  MEAL = 'M',
  FEMALE = 'FM',
}

export class CreateTimelineDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  detail: string;

  @IsNotEmpty()
  @IsEnum(
    [
      LOCATION_TYPE.HOME,
      LOCATION_TYPE.INDOOR,
      LOCATION_TYPE.OUTDOOR,
      LOCATION_TYPE.TRAVELLING,
    ],
    {
      message: 'invalid location type',
    },
  )
  @IsString()
  locationType: LOCATION_TYPE;

  @IsOptional()
  @IsString()
  locationName: string;
}
