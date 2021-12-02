import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum GENDER {
  MEAL = 'M',
  FEMALE = 'FM',
}

export class CreatePatientDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum([GENDER.MEAL, GENDER.FEMALE], {
    message: 'invalid gender',
  })
  @IsString()
  gender: GENDER;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  occupation: string;
}
