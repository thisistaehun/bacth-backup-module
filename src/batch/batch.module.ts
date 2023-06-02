import { Module } from '@nestjs/common';

import { ScheduleModule } from '@nestjs/schedule';
import { EnvironmentConfigModule } from 'src/environment-config/environment-config.module';
import { BatchService } from './batch.service';

@Module({
  imports: [ScheduleModule.forRoot(), EnvironmentConfigModule],
  providers: [BatchService],
})
export class BatchModule {}
