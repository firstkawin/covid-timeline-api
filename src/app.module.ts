import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app';
import mysqlConfig from './config/mysql';
import { PatientsModule } from './patients/patients.module';
import { TimelinesModule } from './timelines/timelines.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env',
      isGlobal: true,
      load: [appConfig, mysqlConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('mysql'),
      inject: [ConfigService],
    }),
    PatientsModule,
    TimelinesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
