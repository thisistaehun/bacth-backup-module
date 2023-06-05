import { Module } from '@nestjs/common';

import { ScheduleModule } from '@nestjs/schedule';
import { EnvironmentConfigModule } from 'src/environment-config/environment-config.module';
import { LoggerModule } from 'src/logger/logger.module';
import { BatchService } from './batch.service';

@Module({
  imports: [ScheduleModule.forRoot(), EnvironmentConfigModule, LoggerModule],
  providers: [BatchService],
})
export class BatchModule {}
