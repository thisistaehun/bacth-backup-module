import { Module } from '@nestjs/common';
import { BatchModule } from './batch/batch.module';
import { EnvironmentConfigModule } from './environment-config/environment-config.module';

@Module({
  imports: [BatchModule, EnvironmentConfigModule],
})
export class AppModule {}
